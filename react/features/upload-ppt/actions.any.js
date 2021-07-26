import { getCurrentConference } from '../base/conference';
import { openDialog } from '../base/dialog/actions';
import { getLocalParticipant } from '../base/participants';
import { UploadPPTDialog } from './components';

import { RESET_UPLOAD_PPT_STATUS, TRY_UPLOAD } from './actionTypes';

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


export function tryPPTUpload(file) {
    return (dispatch, getState) => {
    
        const conference = getCurrentConference(getState());

        if (conference) {
            const localParticipant = getLocalParticipant(getState());
            dispatch({
                type: TRY_UPLOAD,
                file,
                ownerId: localParticipant.id
            });
        }
    };
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
            dispatch(showUploadPPTDialog( file => dispatch(tryPPTUpload(file))));
    };
}
