import React, { memo, StrictMode } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Minesweeper from  './views/Minesweeper';


function App() {
  return (
    <StrictMode>
        {/* <SafeAreaView style={styles.container}>
        </SafeAreaView> */}
        <View style={styles.container}>
               <Minesweeper /> 
        </View>
    </StrictMode>
  );
}


export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
});
