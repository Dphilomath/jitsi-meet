// // @flow

// import React, { Component } from 'react';
// import { Dimensions } from "react-native";
// import { WebView } from 'react-native-webview';

// import type { Dispatch } from 'redux';
// import { View, Text, PixelRatio, StyleSheet, TouchableOpacity } from 'react-native';

import { CustomDialog, BaseDialog, DialogContainer } from '../../../base/dialog';
import { connect } from '../../../base/redux';

// import AbstractSharedPPTDialog from '../AbstractSharedPPTDialog';

// /**
//  * Implements a component to render a display name prompt.
//  */

// class PPTDialog extends Component<Props, State> {

//     constructor(props: Props) {
//         super(props);
//         // console.log(this.props)

//     }

    
//     /**
//      * Implements React's {@link Component#render()}.
//      *
//      * @inheritdoc
//      */
//     render() {  
//         return (
//             <DialogContainer>
//                  <CustomDialog 
//                     style = {{...this.props.style, ...styles.pptDialog }}
//                     cancelKey = 'dialog.Cancel'>
                    
//                     {/* <View style={styles.container}> */}
//                     <WebView
//                         source={{
//                             uri: 'https://github.com/react-native-webview/react-native-webview'
//                         }}/>
//                     {/* </View> */}
//                 </CustomDialog>
//             </DialogContainer>
         
//         );
//     }
// }
// var width = Dimensions.get('window').width; //full width
// var height = Dimensions.get('window').height; //full height


// const styles = StyleSheet.create({
//     pptDialog: {
//         // flex:1,
//         // alignItems:"center",
//         // justifyContent:"center",
//         // width:width,
//         // height:height/1.8
        
//     },
//     container:{
//         flex:1,
//         alignItems:"center",
//         justifyContent:"center"
//     }
// })


// export default connect()(PPTDialog);


import React from 'react';
import { View, Button, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

class PPTDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal : true
        }
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
        console.log(this.props.url)
        return(
                    // <Modal animationType="slide" transparent={true}  visible={this.state.showModal} onRequestClose={() => this.setState({showModal: false}) }>
                        <View style={styles.modal}>
                            <View style={styles.modalContainer}>
                                <WebView 
                                    style={{ flex : 1 }} 
                                    source={{uri: this.props.url}}
                                    renderLoading={this.ActivityIndicatorLoadingView}/>
                            </View>
                        </View>
                    // </Modal>
        )
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
        width : '100%',   // </View>
        height : '40%',
    },
    ActivityIndicatorStyle: {
        flex: 1,
        justifyContent: 'center',
    },
})
export default connect()(PPTDialog);