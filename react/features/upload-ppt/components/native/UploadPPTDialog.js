// @flow

import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import { CustomSubmitDialog} from '../../../base/dialog';
import { connect } from '../../../base/redux';
import styles from './styles'
import AbstractUploadPPTDialog from '../AbstractUploadPPTDialog';

import FilePickerManager from 'react-native-file-picker';

/**
 * Implements a component to render ppt upload dialog
 */
class UploadPPTDialog extends AbstractUploadPPTDialog<*> {
  
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
            console.log('User cancelled file picker');
          }
          else if (response.error) {
            console.log('FilePickerManager Error: ', response.error);
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

    //validate whether the file is a .ppt or .pptx type
    _validated = ()=>{
      let re =  /.*\.pptx?$/
      return re.test(this.getFilename())
    }

    _invalidFile = () =>{
      if(Object.keys(this.state.file).length === 0) return null
      return this._validated() ? null:<Text style = { styles.invalidFile }>Please select a .ppt or .pptx file</Text>
    }
 

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     */
    render() {
        return (
            <CustomSubmitDialog
                okDisabled={ !this._validated() || this.props.uploading }
                okKey="Submit"
                onCancel = { this._onCancel }
                onSubmit = { this._toggleUploadPPT.bind(this) }>
                  
                <View style= { styles.container }>
                  <Text style= { styles.title }>Upload a Presentation</Text>
                  <View style={ styles.upload } >
                    <Text style={ styles.fileInfo }>{ this.getFilename() }</Text>
                    <TouchableOpacity style = { styles.button } onPress={this.selectFileTapped.bind(this)}>
                        <Text>Choose file...</Text>
                    </TouchableOpacity>
                  </View>   
                  {this._invalidFile()}
                </View>  
                <ActivityIndicator animating = {this.props.uploading} size="large" />
            </CustomSubmitDialog>
        );
    }

    /**
    * It returns a boolean to comply the Dialog behaviour:
    *     {@code true} - the dialog should be closed.
    *     {@code false} - the dialog should be left open.
    */
        _toggleUploadPPT() {

          const { onPostSubmit } = this.props;

          onPostSubmit && onPostSubmit(this.state.file);

          return false;
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
  const { loading = false}  = state['features/upload-ppt'];
  console.log(loading)

  return {
     uploading: loading
  };
}

export default connect(_mapStateToProps)(UploadPPTDialog);