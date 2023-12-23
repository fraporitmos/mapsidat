import React from 'react'
import { Platform, SafeAreaView, StatusBar, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import NativeStack from './src/navigator/NativeStack'

function App() {
  return (
    <NavigationContainer>
    {
      Platform.OS === 'ios' ?
      <NativeStack/> :
      <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle='light-content' backgroundColor={"transparent"} translucent={true} />
      <NativeStack />
    </SafeAreaView>
    }
    </NavigationContainer>
    
  )
}

export default App