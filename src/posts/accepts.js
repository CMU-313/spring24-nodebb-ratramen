'use strict';

const db = require('../database');
const plugins = require('../plugins');

module.exports = function (Posts) {
    Posts.accept = async function (pid, uid) {
        // accept(pid: number, uid: number) -> Promise<{ post: Post, isAccepted: boolean }>
        console.assert(typeof pid === 'number', 'pid must be a number');
        console.assert(typeof uid === 'number', 'uid must be a number');
        return await toggleAccept('accept', pid, uid);
    };

    Posts.unaccept = async function (pid, uid) {
        // unaccept(pid: number, uid: number) -> Promise<{ post: Post, isAccepted: boolean }>
        console.assert(typeof pid === 'number', 'pid must be a number');
        console.assert(typeof uid === 'number', 'uid must be a number');
        return await toggleAccept('unaccept', pid, uid);
    };

    async function toggleAccept(type, pid, uid) {
        // toggleAccept(type: string, pid: number, uid: number) -> Promise<{ post: Post, isAccepted: boolean }>
        console.assert(typeof type === 'string', 'type must be a string');
        console.assert(typeof pid === 'number', 'pid must be a number');
        console.assert(typeof uid === 'number', 'uid must be a number');
        if (parseInt(uid, 10) <= 0) {
            throw new Error('[[error:not-logged-in]]');
        }

        let isAccepting = type === 'accept';

        const [postData, hasAccepted] = await Promise.all([
            Posts.getPostFields(pid, ['pid', 'uid']),
            Posts.hasAccepted(pid, uid),
        ]);

        if (isAccepting && hasAccepted) {
            isAccepting = false;
        }

        if (!isAccepting && !hasAccepted) {
            throw new Error('[[error:already-unaccepted]]');
        }

        if (isAccepting) {
            await db.sortedSetAdd(`uid:${uid}:accepts`, Date.now(), pid);
        } else {
            await db.sortedSetRemove(`uid:${uid}:accepts`, pid);
        }
        await db[isAccepting ? 'setAdd' : 'setRemove'](`pid:${pid}:users_accepted`, uid);
        postData.accepts = await db.setCount(`pid:${pid}:users_accepted`);
        await Posts.setPostField(pid, 'accepts', postData.accepts);

        plugins.hooks.fire(`action:post.${type}`, {
            pid: pid,
            uid: uid,
            owner: postData.uid,
            current: hasAccepted ? 'accepted' : 'unaccepted',
        });

        return {
            post: postData,
            isAccepted: isAccepting,
        };
    }

    Posts.hasAccepted = async function (pid, uid) {
        // hasAccepted(pid: number, uid: number) -> Promise<boolean>
        console.assert(typeof pid === 'number', 'pid must be a number');
        console.assert(typeof uid === 'number', 'uid must be a number');
        if (parseInt(uid, 10) <= 0) {
            return Array.isArray(pid) ? pid.map(() => false) : false;
        }

        if (Array.isArray(pid)) {
            const sets = pid.map(pid => `pid:${pid}:users_accepted`);
            return await db.isMemberOfSets(sets, uid);
        }
        return await db.isSetMember(`pid:${pid}:users_accepted`, uid);
    };
};
