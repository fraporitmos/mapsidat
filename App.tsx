import React from 'react'
import { Platform, SafeAreaView, StatusBar, Text, View } from 'react-native'
import MapScreen from './src/screens/MapScreen'

function App() {
  return (
    <>
    {
      Platform.OS === 'ios' ?
      <MapScreen/> :
      <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle='light-content' backgroundColor={"transparent"} translucent={true} />
      <MapScreen />
    </SafeAreaView>
    }
    </>
    
  )
}

export default App