// @flow

import React, { Component } from 'react';
import { Dimensions } from "react-native";

import type { Dispatch } from 'redux';
import { View, Text, PixelRatio, StyleSheet, TouchableOpacity } from 'react-native';

import { CustomDialog } from '../../../base/dialog';
import { connect } from '../../../base/redux';

import AbstractSharedPPTDialog from '../AbstractSharedPPTDialog';

/**
 * Implements a component to render a display name prompt.
 */
class PPTDialog extends Component {

    constructor(props: Props) {
        super(props);
        // console.log(this.props)

    }

    
    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     */
    render() {  
        return (
          <CustomDialog 
            style = {{...this.props.style, ...styles.pptDialog }}
            cancelKey = 'dialog.Cancel'>
            <View style={styles.container}>
                {this._renderContent()}
            </View>
        </CustomDialog>

        );
    }
    _renderContent(){
        if(!this.props.uploaded) return <Text>No presentation uploaded</Text>
        else return <View></View>
    }
}
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


const styles = StyleSheet.create({
    pptDialog: {
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        width:width,
        height:height/1.8
    },
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    }
})


export default connect()(PPTDialog);
