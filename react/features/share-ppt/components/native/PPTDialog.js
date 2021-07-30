// // @flow
import { connect } from '../../../base/redux';

import React from 'react';
import { View, Button, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { JitsiModal } from '../../../base/modal';
import { SHARE_PPT_ID } from '../../constants';

class PPTDialog extends React.Component {
    constructor(props) {
        super(props)
        this.ActivityIndicatorLoadingView = this.ActivityIndicatorLoadingView.bind(this)
    }



    ActivityIndicatorLoadingView() {
       return (
         <ActivityIndicator
            color="#009688"
            size="large"
            style={styles.ActivityIndicatorStyle}
         /> 
       );
    }

    render(){
        console.log("PPTDialog.js:101 "+this.props.url)
        return(


            <JitsiModal
                hideHeaderWithNavigation={true}
                headerProps = {{
                    headerLabelKey: 'Presentation'
                }}
                
                modalId = { SHARE_PPT_ID }
                style = { styles.webView }>

            <WebView
                scrollEnabled={true}
                renderLoading = { this.ActivityIndicatorLoadingView }
                source = {{ uri: this.props.url }}
                startInLoadingState = { true }
                style={{flex:1}}
                />
            </JitsiModal>
        );
    }
}
const styles = StyleSheet.create({
    modal : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContainer : {
        backgroundColor : 'white',
        width : '100%', 
        height : '40%',
    },
    ActivityIndicatorStyle: {
        flex: 1,
        justifyContent: 'center',
    },
    webView:{
        flex:1,
        justifyContent:"center",
        alignContent:"center",
    }
})
export default connect()(PPTDialog);