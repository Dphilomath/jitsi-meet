import { PixelRatio, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
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
    },
    invalidFile: {
      color:"red"
    }
  });

  export default styles