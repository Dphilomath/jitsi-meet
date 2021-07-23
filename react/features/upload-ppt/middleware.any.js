// @flow

import { CONFERENCE_LEFT, getCurrentConference, getRoomName} from '../base/conference';
import { getLocalParticipant, PARTICIPANT_LEFT, participantLeft } from '../base/participants';
import { MiddlewareRegistry, StateListenerRegistry } from '../base/redux';

import { SET_UPLOAD_PPT_STATUS, SET_UPLOADING, TRY_UPLOAD } from './actionTypes';
import { resetUploadPPTStatus, retryUpload, setUploadPPTStatus } from './actions.any';
import { batch } from 'react-redux';
import { openDialog } from '../base/dialog/actions';
import { AlertDialog } from '../base/dialog/components'


/**
 * Middleware for uploading the ppt
 * 
 * @param {Store} store - The redux store.
 * @returns {Function}
 */
MiddlewareRegistry.register(store => next => async action => {
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
                try{
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
                  

                    fetch("https://sangoshthee.cdac.in/FileUploadService", requestOptions)
                        .then(response => {
                            if(response.status !== 200){
                                dispatch(openDialog(AlertDialog, {
                                    contentKey:{
                                        key: response.status
                                    }
                                }))
                                
                            }
                            else return response.json()
                        })
                        .then(result =>  { 
                            console.log(result)
                            if(result.status === "1" || result.status === "0" ){
                                dispatch({
                                    type: SET_UPLOAD_PPT_STATUS,
                                    file,
                                    status: result.status,
                                    ownerId
                                })
                                dispatch(openDialog(AlertDialog, {
                                    contentKey:{
                                        key: result.msg
                                    }
                                }))
                            }else dispatch(openDialog(AlertDialog, {
                                contentKey: {
                                    key: "Server Error"
                                }
                            }))
                           
                        })
                        .catch(error => {
                            console.log('error', error)
                            dispatch(openDialog(AlertDialog, {
                                contentKey:{
                                    key: error
                                }
                            }))
                        }); 
                        dispatch({ 
                            type: SET_UPLOADING,
                            loading:false 
                        })
                } catch(err){
                    console.log(err)
                    dispatch({ 
                        type: SET_UPLOADING,
                        loading: false 
                    })
                }
            }
            break;

        case PARTICIPANT_LEFT:
            batch(()=>{
                dispatch(participantLeft(localParticipantId, conference, false));
                dispatch(resetUploadPPTStatus())
            })
            break;
        }

    return next(action);
});

