// @flow
import type { Dispatch } from 'redux';


import { translate } from '../../../base/i18n';
import { IconPPT } from '../../../base/icons';
import { connect } from '../../../base/redux';
import { getLocalParticipant } from '../../../base/participants';
import { AbstractButton, type AbstractButtonProps } from '../../../base/toolbox/components';
import { toggleUploadPresentation } from '../../actions.native';
import { getFeatureFlag, UPLOAD_PPT_ENABLED } from '../../../base/flags';
import { Alert } from 'react-native';



/**
 * The type of the React {@code Component} props of {@link TileViewButton}.
 */
 type Props = AbstractButtonProps & {

    /**
     * Whether or not the button is disabled.
     */
    _isDisabled: boolean,

    /**
     * The redux {@code dispatch} function.
     */
    dispatch: Dispatch<any>
};

/**
 * Component that renders an upload presentation button..
 *
 * @extends AbstractButton
 */
class UploadPresentationButton extends AbstractButton<Props, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.uploadPresentation';
    icon = IconPPT;
    label = 'toolbar.uploadPresentation';
    toggledLabel= 'toggled';

    /**
     * Handles clicking / pressing the button.
     *
     * @override
     * @protected
     * @returns {void}
     */
    _handleClick() {
        this._doToggleUploadPresentation()
    }

    

    /**
     * Indicates whether this button is disabled or not.
     *
     * @override
     * @protected
     * @returns {boolean}
     */
    _isDisabled() {
        return this.props._isDisabled;
    }
    

    /**
     * Dispatches an action to toggle presentation upload.
     *
     * @private
     * @returns {void}
     */
    _doToggleUploadPresentation(){
        this.props.dispatch(toggleUploadPresentation())
    }
}


/**
 * Maps part of the Redux state to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @param {Object} ownProps - The properties explicitly passed to the component instance.
 * @private
 * @returns {Props}
 */
 function _mapStateToProps(state, ownProps): Object {
    const { ownerId, status } = state['features/upload-ppt'];
    const { status: sharedPPTStatus } = state['features/shared-ppt'];
    const localParticipantId = getLocalParticipant(state).id;
    const enabled = getFeatureFlag(state, UPLOAD_PPT_ENABLED, true);
    const { visible = enabled } = ownProps;

    if (ownerId !== localParticipantId) {
        return {
            _isDisabled: sharedPPTStatus==='start',
            visible
        };
    }

    return {
        _isDisabled: sharedPPTStatus==='start',
        visible
    };
}

export default translate(connect(_mapStateToProps)(UploadPresentationButton));