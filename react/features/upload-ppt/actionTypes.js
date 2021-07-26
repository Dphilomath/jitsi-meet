// @flow

/**
 * The type of the action which signals to update the current known state of the
 * shared PPT.
 *
 * {
 *     type: SET_UPLOAD_PPT_STATUS,
 *     status: string
 * }
 */
export const SET_UPLOAD_PPT_STATUS = 'SET_UPLOAD_PPT_STATUS';

/**
 * The type of the action which signals to reset the current known state of the
 * shared PPT.
 *
 * {
 *     type: RESET_SHARED_PPT_STATUS,
 * }
 */
export const RESET_UPLOAD_PPT_STATUS = 'RESET_UPLOAD_PPT_STATUS';

/**
 * The type of the action which signals to disable or enable the shared PPT
 * button.
 *
 * {
 *     type: SET_DISABLE_BUTTON
 * }
 */
export const SET_DISABLE_BUTTON = 'SET_DISABLE_BUTTON';

export const RETRY_UPLOAD = 'RETRY_UPLOAD'

export const SET_UPLOADING = 'SET_UPLOADING'

export const TRY_UPLOAD = 'TRY_UPLOAD'
