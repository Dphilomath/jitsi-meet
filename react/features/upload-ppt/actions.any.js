import { getCurrentConference } from '../base/conference';
import { openDialog } from '../base/dialog/actions';
import { getLocalParticipant } from '../base/participants';
import { SharedPPTDialog } from './components';

import { RESET_SHARED_PPT_STATUS, SET_SHARED_PPT_STATUS } from './actionTypes';

/**
 * Resets the status of the shared PPT.
 *
 * @returns {{
 *     type: SET_SHARED_PPT_STATUS,
 * }}
 */
export function resetSharedPPTStatus() {
    return {
        type: RESET_SHARED_PPT_STATUS
    };
}

/**
 * Updates the current known status of the shared video.
 *
 * @param {{
 *     ownerId: string,
 *     status: boolean,
 *     time: number
 * }} options - The options.
 *
 * @returns {{
 *     type: SET_SHARED_PPT_STATUS,
 *     ownerId: string,
 *     status: boolean,
 *     time: number
 * }}
 */
export function setSharedPPTStatus({ status, time, ownerId }) {
    return {
        type: SET_SHARED_PPT_STATUS,
        ownerId,
        status,
        time
    };
}

/**
 * Displays the dialog for uploading presentation.
 *
 * @param {Function} onPostSubmit - The function to be invoked when a valid link is entered.
 * @returns {Function}
 */
export function showSharedPPTDialog() {
    return openDialog(SharedPPTDialog);
}

/**
 *
 * Stops playing a shared PPT.
 *
 * @returns {Function}
 */
export function stopSharedPPT() {
    return (dispatch, getState) => {
        const state = getState();
        const { ownerId } = state['features/upload-ppt'];
        const localParticipant = getLocalParticipant(state);

        if (ownerId === localParticipant.id) {
            dispatch(resetSharedPPTStatus());
        }
    };
}

/**
 *
 * Plays a shared video.
 *
 * @param {string} videoUrl - The video url to be played.
 *
 * @returns {Function}
 */
export function playSharedPPT() {
    return (dispatch, getState) => {
        const conference = getCurrentConference(getState());

        if (conference) {
            const localParticipant = getLocalParticipant(getState());

            dispatch(setSharedPPTStatus({
                status: true,
                time: 0,
                ownerId: localParticipant.id
            }));
        }
    };
}

/**
 *
 * Stops the presentation.
 *
 * @returns {Function}
 */
export function toggleSharedPresentation() {
    return (dispatch, getState) => {
        const state = getState();
        const { status } = state['features/upload-ppt'];

        if (status === true ) {
            dispatch(stopSharedPPT());
        } else {
            dispatch(showSharedPPTDialog());
        }
    };
}
