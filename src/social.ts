// This is one of the two example TypeScript files included with the NodeBB repository
// It is meant to serve as an example to assist you with your HW1 translation

import lo from 'lodash';
import plugins from './plugins';
import db from './database';

import { Network } from './types';

let postSharing: Network[] | null = null;

export async function getPostSharing(): Promise<Network[]> {
    if (postSharing) {
        return lo.cloneDeep(postSharing);
    }

    let networks: Network[] = [
        {
            id: 'facebook',
            name: 'Facebook',
            class: 'fa-facebook',
            activated: null,
        },
        {
            id: 'twitter',
            name: 'Twitter',
            class: 'fa-twitter',
            activated: null,
        },
    ];

    networks = await plugins.hooks.fire('filter:social.posts', networks) as Network[];

    // The next line calls a function in a module that has not been updated to TS yet
    const activated: string[] = await db.getSetMembers('social:posts.activated') as string[]; // eslint-disable-line

    networks.forEach((network) => {
        network.activated = activated.includes(network.id);
    });

    postSharing = networks;
    return lo.cloneDeep(networks);
}

export async function getActivePostSharing(): Promise<Network[]> {
    const networks: Network[] = await getPostSharing();
    return networks.filter(network => network && network.activated);
}

export async function setActivePostSharingNetworks(networkIDs: string[]): Promise<undefined> {
    postSharing = null;

    // The next line calls a function in a module that has not been updated to TS yet
    await db.delete('social:posts.activated'); // eslint-disable-line

    if (!networkIDs.length) {
        return;
    }

    // The next line calls a function in a module that has not been updated to TS yet
    await db.setAdd('social:posts.activated', networkIDs); // eslint-disable-line
}
