// @flow

import { CONFERENCE_LEFT, getCurrentConference, getRoomName} from '../base/conference';
import { getLocalParticipant, PARTICIPANT_LEFT, participantLeft } from '../base/participants';
import { MiddlewareRegistry, StateListenerRegistry } from '../base/redux';

import { SET_UPLOAD_PPT_STATUS } from './actionTypes';
import { resetUploadPPTStatus, retryUpload, setUploadPPTStatus } from './actions.any';


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

        case SET_UPLOAD_PPT_STATUS:
            if (localParticipantId === ownerId) {
                try{
                    var formdata = new FormData();
                    formdata.append("sampleFile", { name: file.fileName, uri: file.uri, type: file.type });
                    formdata.append("username", room)

                    var requestOptions = {
                        method: 'POST',
                        body: formdata,
                        redirect: 'follow'
                    };

                    fetch("https://sangoshthee.cdac.in/FileUploadService", requestOptions)
                        .then(response => response.json())
                        .then(result =>  { 
                            console.log(result)
                            if(result.status === "1"){
                                dispatch({
                                    type: SET_UPLOAD_PPT_STATUS,
                                    ownerId: localParticipantId,
                                    status: result.status,
                                    ownerId
                                })
                            }
                            else dispatch(retryUpload())
                        })
                        .catch(error => console.log('error', error)); 
                } catch(err){
                    console.log(err)
                }
            }
            break;

        case PARTICIPANT_LEFT:
            dispatch(participantLeft(localParticipantId, conference, false));
            break;
        }

    return next(action);
});

