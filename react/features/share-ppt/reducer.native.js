// @flow

import { ReducerRegistry } from '../base/redux';

import { RESET_SHARED_PPT_STATUS, SET_SHARED_PPT_STATUS } from './actionTypes';

const initialState = {};

/**
 * Reduces the Redux actions of the feature features/shared-ppt.
 */
ReducerRegistry.register('features/shared-ppt', (state = initialState, action) => {
    const { status, time, ownerId } = action;

    switch (action.type) {
    case RESET_SHARED_PPT_STATUS:
        return initialState;
    case SET_SHARED_PPT_STATUS:
        return {
            ...state,
            ownerId,
            status,
            time
        };
    default:
        return state;
    }
});
