import { getCurrentConference, getConferenceState } from '../base/conference';
import { openDialog } from '../base/dialog/actions';
import { getLocalParticipant } from '../base/participants';
import { SharedPPTDialog, PPTDialog } from './components';

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
 * }} options - The options.
 *
 * @returns {{
 *     type: SET_SHARED_PPT_STATUS,
 *     ownerId: string,
 *     status: boolean,
 * }}
 */
 export function setSharedPPTStatus({ url, status, ownerId }) {
    return {
        type: SET_SHARED_PPT_STATUS,
        ownerId,
        status,
        url
    };
}

/**
 * Displays the presentation dialog
 *
 * @param {Function} onPostSubmit - The function to be invoked when sharing prompt is confirmed.
 * @returns {Function}
 */
export function showSharedPPTDialog(onPostSubmit) {
    return openDialog(SharedPPTDialog, { onPostSubmit });
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
        const { ownerId } = state['features/shared-ppt'];
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
 export function playSharedPPT()     {
    return (dispatch, getState) => {
        const conference = getCurrentConference(getState());
        const url = 'https://sangoshthee.cdac.in/presentation/?meetingId=' + getConferenceState(getState()).room;

        if (conference) {
            const localParticipant = getLocalParticipant(getState());

            dispatch(setSharedPPTStatus({
                url,
                status: 'start',
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
        const { status } = state['features/shared-ppt'];
        if (status === 'start' ) {
            dispatch(stopSharedPPT());
        } else {
            dispatch(showSharedPPTDialog(() => dispatch(playSharedPPT())));
        }
    };
}
