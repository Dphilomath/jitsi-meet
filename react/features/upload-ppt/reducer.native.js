// @flow

import { ReducerRegistry } from '../base/redux';

import { SET_UPLOAD_PPT_STATUS, RESET_UPLOAD_PPT_STATUS, RETRY_UPLOAD} from './actionTypes';

const initialState = {};

/**
 * Reduces the Redux actions of the feature features/upload-ppt.
 */
ReducerRegistry.register('features/upload-ppt', (state = initialState, action) => {
    const { file, status, ownerId } = action;

    switch (action.type) {
    case RESET_UPLOAD_PPT_STATUS:
        return initialState;
    case SET_UPLOAD_PPT_STATUS:
        return {
            ...state,
            ownerId,
            status,
            file
        };
    case RETRY_UPLOAD:
        return {
            failed: true,
            loading: false
        }
    default:
        return state;
    }
});
