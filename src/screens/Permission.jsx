import React, { useEffect, useState } from 'react'
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native'
import { PERMISSIONS, check, request, openSettings } from 'react-native-permissions';


const Permission = NaviteStack => {
  const [loader, setloader] = useState(true)
  useEffect(() => {
    checkPermissionRunTime()
  }, [])


  const checkPermissionRunTime = async () => {
    let stateCheck;
    if (Platform.OS == 'android') {
      stateCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)

    }

    if (Platform.OS == 'ios') {
      stateCheck = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
    }

    switch (stateCheck) {
      case 'blocked': {
        setloader(false)
      }
        break;
      case 'denied': {
        setloader(false)
        requestPermission()
      }
        break;
      case 'granted': {
        NaviteStack.navigation.navigate("MapScreen")
      }
        break;

    }


  }

  const checkPermissionUser = async () => {
    let stateCheck;
    if (Platform.OS == 'android') {
      stateCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
    }

    if (Platform.OS == 'ios') {
      stateCheck = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
    }

    switch (stateCheck) {
      case 'blocked': {
        openSettings()
        setloader(false)
      }
        break;
      case 'denied': {
        setloader(false)
        requestPermission()
      }
        break;
      case 'granted': {
        NaviteStack.navigation.navigate("MapScreen")
      }
        break;

    }


  }

  const requestPermission = async () => {
    let stateRequest;
    if (Platform.OS == 'android') {
      stateRequest = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)

    }

    if (Platform.OS == 'ios') {
      stateRequest = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)

    }
    console.log(stateRequest)
    switch (stateRequest) {

      case 'granted': {
        NaviteStack.navigation.navigate("MapScreen")
      }
        break;
      case 'denied': {
        requestPermission()
      }
        break;
    }
  }


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {
        loader ?
          <Text>Cargando ...</Text>
          :
          <>
            <Image
              style={{ width: '100%', height: '30%', resizeMode: 'contain' }}
              source={require('../assets/permission.png')}
            />
            <Text style={{ width: '90%', marginVertical: 16, textAlign: 'center' }}>
              Para utilizar las funcionalidades de la aplicacion es necesario tener acceso a los permisos de localizacion.
            </Text>
            <TouchableOpacity
              onPress={() => checkPermissionUser()}
              style={{ backgroundColor: '#3F4CFF', borderRadius: 15, width: '50%' }}
            >

              <Text
                style={{ color: 'white', fontSize: 16, fontWeight: 'bold', padding: 12, textAlign: 'center' }}
              >Permitir Gps</Text>
            </TouchableOpacity>
          </>
      }


    </View>
  )
}

export default Permission