// @flow

import { batch } from 'react-redux';

import { CONFERENCE_LEFT, getCurrentConference } from '../base/conference';
import {
    PARTICIPANT_LEFT,
    getLocalParticipant,
    participantJoined,
    participantLeft,
    pinParticipant
} from '../base/participants';
import { MiddlewareRegistry, StateListenerRegistry } from '../base/redux';

import { SET_SHARED_PPT_STATUS, RESET_SHARED_PPT_STATUS } from './actionTypes';
import {
    resetSharedPPTStatus,
    setSharedPPTStatus
} from './actions.any';
import { SHARED_PPT, PPT_PARTICIPANT_NAME } from './constants';


/**
 * Middleware that captures actions related to video sharing and updates
 * components not hooked into redux.
 *
 * @param {Store} store - The redux store.
 * @returns {Function}
 */
MiddlewareRegistry.register(store => next => action => {
    const { dispatch, getState } = store;
    const state = getState();
    const conference = getCurrentConference(state);
    const localParticipantId = getLocalParticipant(state)?.id;
    const { url, status, ownerId } = action;
    const { ownerId: stateOwnerId, url: stateUrl} = state['features/shared-ppt'];

    switch (action.type) {
    case CONFERENCE_LEFT:
        dispatch(resetSharedPPTStatus());
        break;
    case PARTICIPANT_LEFT:
        if (action.participant.id === stateOwnerId) {
            batch(() => {
                dispatch(resetSharedPPTStatus());
                dispatch(participantLeft(conference));
            });
        }
        break;
    case SET_SHARED_PPT_STATUS:
        if (localParticipantId === ownerId) {
            sendSharePPTCommand({
                conference,
                localParticipantId,
                status,
                id: url
            });
        }
        break;
    case RESET_SHARED_PPT_STATUS:
        if (localParticipantId === stateOwnerId) {
            sendSharePPTCommand({
                conference,
                localParticipantId,
                status: 'stop',
                id: stateUrl
            });
        }
        break;
    }

    return next(action);
});

/**
 * Set up state change listener to perform maintenance tasks when the conference
 * is left or failed, e.g. clear messages or close the chat modal if it's left
 * open.
 */
StateListenerRegistry.register(
    state => getCurrentConference(state),
    (conference, store, previousConference) => {
        if (conference && conference !== previousConference) {
            conference.addCommandListener(SHARED_PPT,
                ({ value, attributes }) => {

                    const { dispatch, getState } = store;
                    const { from } = attributes;
                    const localParticipantId = getLocalParticipant(getState()).id;
                    const status = attributes.state;

                    if (status ===  'start') {
                        console.log("start "+value)
                        handleSharingPPTStatus(store, value, attributes, conference);
                    } else if (status === 'stop') {
                        console.log("stop "+value)
                        dispatch(participantLeft(value, conference));
                        if (localParticipantId !== from) {
                            dispatch(resetSharedPPTStatus());
                        }
                    }
                }
            );
        }
    }
);

/**
 * Handles the playing, pause and start statuses for the shared video.
 * Dispatches participantJoined event and, if necessary, pins it.
 * Sets the SharedVideoStatus if the event was triggered by the local user.
 *
 * @param {Store} store - The redux store.
 * @param {string} url - The id of the ppt to the shared.
 * @param {Object} attributes - The attributes received from the share ppt command.
 * @param {JitsiConference} conference - The current conference.
 * @returns {void}
 */
function handleSharingPPTStatus(store, url, { state, from }, conference) {
    const { dispatch, getState } = store;
    const localParticipantId = getLocalParticipant(getState()).id;
    const oldStatus = getState()['features/shared-ppt']?.status;
    console.log("reached handleSharing")
    if (state === 'start' ) {
        const avatarURL = null

        dispatch(participantJoined({
            conference,
            id: url,
            isFakeParticipant: true,
            // avatarURL,
            name: PPT_PARTICIPANT_NAME
        }));

        dispatch(pinParticipant(url));
    }

    if (localParticipantId !== from) {
        dispatch(setSharedPPTStatus({
            ownerId: from,
            status: state,
            url
        }));
    }
}

/* eslint-disable max-params */

/**
 * Sends SHARED_PPT command.
 *
 * @param {string} id - The id of the video.
 * @param {string} status - The status of the shared ppt.
 * @param {JitsiConference} conference - The current conference.
 * @param {string} localParticipantId - The id of the local participant.
 * @returns {void}
 */
function sendSharePPTCommand({ id, status, conference, localParticipantId }) {
    console.log("inside sendSharedPPTcommand", status)
    
    conference.sendCommandOnce(SHARED_PPT, {
        value: id,
        attributes: {
            from: localParticipantId,
            state: status
        }
    });
}
