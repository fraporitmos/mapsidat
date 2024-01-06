import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const LoginScreen = nativeStack => {
  return (

          <View
                style={{
                    position: 'absolute',
                    bottom: 40,
                    width: '100%',
                    alignItems: 'center'
                }}>
                <TouchableOpacity
                onPress={()=> {
                  nativeStack.navigation.navigate('SignUpScreen')
                }}
                    style={{
                        backgroundColor: '#000',
                        borderRadius: 20,
                        padding: 16,
                        width: '80%'
                    }} >
                    <Text
                        style={{
                            color: 'white',
                            textAlign: 'center',
                            fontSize: 18,
                            fontWeight: 'bold'
                        }}>
                        Sign Up</Text>
                </TouchableOpacity>
            </View>
  )
}

export default LoginScreen