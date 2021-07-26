// @flow

import { getParticipants } from '../base/participants';

import { PPT_PARTICIPANT_NAME } from './constants';




/**
 * Returns true if there is a PPT is being shared in the meeting.
 *
 * @param {Object | Function} stateful - The Redux state or a function that gets resolved to the Redux state.
 * @returns {boolean}
 */
export function isVideoPlaying(stateful: Object | Function): boolean {
    return Boolean(getParticipants(stateful).find(p => p.isFakeParticipant
        && (p.name === PPT_PARTICIPANT_NAME))
    );
}

export  async function uploadPPT(requestOptions){

    const response = await fetch("https://sangoshthee.cdac.in/FileUploadService", requestOptions)

    if(!response.ok){
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    const result = await response.json()
    return result
}
