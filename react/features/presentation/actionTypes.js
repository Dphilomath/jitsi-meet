// @flow

/**
 * The type of the action which signals to update the current known state of the
 * shared PPT.
 *
 * {
 *     type: SET_SHARED_PPT_STATUS,
 *     status: string
 * }
 */
export const SET_SHARED_PPT_STATUS = 'SET_SHARED_PPT_STATUS';

/**
 * The type of the action which signals to reset the current known state of the
 * shared PPT.
 *
 * {
 *     type: RESET_SHARED_PPT_STATUS,
 * }
 */
export const RESET_SHARED_PPT_STATUS = 'RESET_SHARED_PPT_STATUS';

/**
 * The type of the action which signals to disable or enable the shared PPT
 * button.
 *
 * {
 *     type: SET_DISABLE_BUTTON
 * }
 */
export const SET_DISABLE_BUTTON = 'SET_DISABLE_BUTTON';
