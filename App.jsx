import React from 'react'
import { Platform, SafeAreaView, StatusBar, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import NativeStack from './src/navigator/NativeStack'
import { Provider } from 'react-redux'
import { Store, persistor } from './src/redux/store'
import { PersistGate } from 'redux-persist/integration/react'

function App() {
  return (
    <Provider store={Store}>
      <PersistGate persistor={persistor} loading={<Text>Cargando...</Text>}>
      <NavigationContainer>

        {
          Platform.OS === 'ios' ?
            <NativeStack /> :
            <SafeAreaView style={{ flex: 1 }}>
              <StatusBar barStyle='light-content' backgroundColor={"transparent"} translucent={true} />
              <NativeStack />
            </SafeAreaView>
        }
      </NavigationContainer>
      </PersistGate>
    </Provider>

  )
}

export default App