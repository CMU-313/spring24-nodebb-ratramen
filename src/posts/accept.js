'use strict';

const meta = require('../meta');
const db = require('../database');
const flags = require('../flags');
const user = require('../user');
const topics = require('../topics');
const plugins = require('../plugins');
const privileges = require('../privileges');
const translator = require('../translator');

module.exports = function (Posts) {

    Posts.updateAcceptanceStatus = async function (postData) {
        await Promise.all([
            db.sortedSetAdd('posts:accept', postData.acceptance, postData.pid),
            Posts.setPostFields(postData.pid, {
                accepted: postData.accepted,
            }),
        ]);
        plugins.hooks.fire('action:post.updateAcceptanceStatus', { post: postData });
    };
};
