// @flow

import React from 'react';
import { View, Text, PixelRatio, StyleSheet, TouchableOpacity } from 'react-native';

import { ConfirmDialog} from '../../../base/dialog';
import { connect } from '../../../base/redux';

import AbstractSharedPPTDialog from '../AbstractSharedPPTDialog';

/**
 * Implements a component to render a display name prompt.
 */
class SharedPPTDialog extends AbstractSharedPPTDialog<*> {

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     */
    render() {
        return (
          <ConfirmDialog
            contentKey = 'dialog.startPresenting'
            cancelKey = 'dialog.Cancel'
            okKey = "Share"
            onSubmit = { this._onConfirmSharePPT } />
        );
    }

       /**
     * Validates the entered video link by extracting the id and dispatches it.
     *
     * It returns a boolean to comply the Dialog behaviour:
     *     {@code true} - the dialog should be closed.
     *     {@code false} - the dialog should be left open.
     *
     * @param {string} link - The entered video link.
     * @returns {boolean}
     */
        _onConfirmSharePPT() {
            const { onPostSubmit } = this.props;
            onPostSubmit && onPostSubmit();
            
            return false;
        }
}



export default connect()(SharedPPTDialog);
