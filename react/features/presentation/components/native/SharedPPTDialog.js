// @flow

import React from 'react';
import { View, Text, TextInput } from 'react-native';

import { InputDialog, AlertDialog, CustomSubmitDialog} from '../../../base/dialog';
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
            <CustomSubmitDialog
                onCancel = { this._onCancel }
                onSubmit = { this._onLogin }>
            <View>
                <Text>Upload a presentation</Text>
            </View>
            <TextInput style={{borderColor:"red"}}/>
                
            </CustomSubmitDialog>
        );
    }
}


export default connect()(SharedPPTDialog);
