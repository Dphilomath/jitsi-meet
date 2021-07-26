// @flow

import { CONFERENCE_LEFT, getCurrentConference, getRoomName} from '../base/conference';
import { getLocalParticipant, PARTICIPANT_LEFT, participantLeft } from '../base/participants';
import { MiddlewareRegistry } from '../base/redux';
import { SET_UPLOAD_PPT_STATUS, SET_UPLOADING, TRY_UPLOAD } from './actionTypes';
import { resetUploadPPTStatus } from './actions.any';
import { openDialog } from '../base/dialog/actions';
import { AlertDialog } from '../base/dialog/components'
import { uploadPPT } from './functions'


/**
 * Middleware for uploading the ppt
 * 
 * @param {Store} store - The redux store.
 * @returns {Function}
 */
MiddlewareRegistry.register(store => next => action => {
    const { dispatch, getState } = store;
    const state = getState();
    const conference = getCurrentConference(state)
    const room = getRoomName(state)
    const localParticipantId = getLocalParticipant(state)?.id;
    const { file, ownerId } = action;

    switch (action.type) {

        case CONFERENCE_LEFT:
            dispatch(resetUploadPPTStatus());
            break;

        case TRY_UPLOAD:
            if (localParticipantId === ownerId) {
                    const formdata = new FormData();
                    formdata.append("sampleFile", { name: file.fileName, uri: file.uri, type: file.type });
                    formdata.append("username", room)

                    const requestOptions = {
                        method: 'POST',
                        body: formdata,
                        redirect: 'follow'
                    };

                    dispatch({ 
                        type: SET_UPLOADING,
                        loading: true 
                    })

                    uploadPPT(requestOptions)
                    .then(result => {
                        dispatch({
                            type: SET_UPLOADING,
                            loading: false
                        })
                        if(result.status==="1"){
                            dispatch({
                                type: SET_UPLOAD_PPT_STATUS,
                                file,
                                status: true,
                                ownerId
                            })
                        }else {
                            dispatch(resetUploadPPTStatus)
                        }
                        dispatch(openDialog(AlertDialog, {
                            contentKey: {
                                key: result.msg
                            }
                        }))
                    })
                    .catch(err =>{
                        dispatch({
                            type: SET_UPLOADING,
                            loading: false
                        })
                        dispatch(openDialog(AlertDialog, {
                            contentKey: {
                                key: err
                            }
                        }))
                        console.log(err)
                    })
 
                    } 
                break;
            }
            return next(action);
        }
)