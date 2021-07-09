// @flow

import React from 'react';
import { View, Text, PixelRatio, StyleSheet, TouchableOpacity } from 'react-native';

import { InputDialog, AlertDialog, CustomSubmitDialog} from '../../../base/dialog';
import { connect } from '../../../base/redux';

import AbstractSharedPPTDialog from '../AbstractSharedPPTDialog';

import FilePickerManager from 'react-native-file-picker';

/**
 * Implements a component to render a display name prompt.
 */
class SharedPPTDialog extends AbstractSharedPPTDialog<*> {

    state = {
        file: {}
    };

    getFilename(){
      const {fileName="No file chosen"}=this.state.file
      return fileName
    }

    selectFileTapped() {
        const options = {
          title: 'File Picker',
          chooseFileButtonTitle: 'Choose File...'
        };
    
        FilePickerManager.showFilePicker(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled photo picker');
          }
          else if (response.error) {
            console.log('ImagePickerManager Error: ', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }
          else {
            this.setState({
              file: response
            });
          }
        });
      }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     */
    render() {
        return (
            <CustomSubmitDialog
                okKey="Submit"
                onCancel = { this._onCancel }
                onSubmit = { this._onLogin }>
                <View style={styles.container}>
                  <Text style={styles.title}>Upload a presentation</Text>
                  <View style={styles.upload} >
                    <Text style={styles.fileInfo}>{this.getFilename()}</Text>
                    <TouchableOpacity style={styles.button} onPress={this.selectFileTapped.bind(this)}>
                        <Text>Choose file...</Text>
                    </TouchableOpacity>
                  </View>   
                </View>  
            </CustomSubmitDialog>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: '#F5FCFF',
      height:100
    },
    button: {
      borderColor: '#9B9B9B',
      borderWidth: 1 / PixelRatio.get(),
      justifyContent:"center",
      alignItems:"center",
      margin: 5,
      padding: 5
    },
    fileInfo: {
      borderColor: '#9B9B9B',
      borderWidth: 1 / PixelRatio.get(),
      margin: 5,
      padding: 5,
      width:"70%"
    },
    upload:{
      flexDirection:"row"
    },
    title:{
      fontWeight:"bold",
      fontSize:17,
      paddingBottom:10
    }
  });


export default connect()(SharedPPTDialog);
