import { getCurrentConference } from '../base/conference';
import { openDialog } from '../base/dialog/actions';
import { getLocalParticipant } from '../base/participants';
import { UploadPPTDialog } from './components';

import { RESET_UPLOAD_PPT_STATUS, SET_UPLOAD_PPT_STATUS, RETRY_UPLOAD } from './actionTypes';

/**
 * Resets the status of the upload PPT.
 *
 * @returns {{
 *     type: RESET_UPLOAD_PPT_STATUS,
 * }}
 */
export function resetUploadPPTStatus() {
    return {
        type: RESET_UPLOAD_PPT_STATUS
    };
}

export function setUploadPPTStatus(file) {
    return (dispatch, getState) => {
    
        const conference = getCurrentConference(getState());

        if (conference) {
            const localParticipant = getLocalParticipant(getState());
            dispatch({
                type: SET_UPLOAD_PPT_STATUS,
                file,
                ownerId: localParticipant.id
            });
        }
    };
}
export function retryUpload(){
    return {
        type: RETRY_UPLOAD
    }
}

/**
 * Displays the dialog for uploading presentation.
 *
 * @returns {Function}
 */
export function showUploadPPTDialog(onPostSubmit) {
    return openDialog(UploadPPTDialog, { onPostSubmit });
}

/**
 *
 * Toggles the upload presentation button.
 *
 * @returns {Function}
 */
export function toggleUploadPresentation() {
    return (dispatch, getState) => {
        const state = getState();
        const { status } = state['features/upload-ppt'];
            dispatch(showUploadPPTDialog( file => dispatch(setUploadPPTStatus(file))));
    };
}
