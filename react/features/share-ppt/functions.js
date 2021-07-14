// @flow

import { getParticipants } from '../base/participants';

import { PPT_PARTICIPANT_NAME } from './constants';




/**
 * Returns true if there is a PPT is being shared in the meeting.
 *
 * @param {Object | Function} stateful - The Redux state or a function that gets resolved to the Redux state.
 * @returns {boolean}
 */
export function isPPTPlaying(stateful: Object | Function): boolean {
    return Boolean(getParticipants(stateful).find(p => p.isFakeParticipant
        && (p.name === PPT_PARTICIPANT_NAME))
    );
}
