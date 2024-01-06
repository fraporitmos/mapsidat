import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../LoginScreen/firebase'

const SignUpScreen = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async() => {
        if( email && password){
                try{
                       await createUserWithEmailAndPassword(auth, email, password)     
                }catch(error){
                    console.log(error.message)
                }
        }
        
    }

    return (
        <View style={{ flex: 1, marginTop: 80, padding: 16 }}>
            <TextInput
                style={{ height: 60, borderColor: 'gray', borderWidth: 1 }}
                placeholder='Username'
                placeholderTextColor={'gray'}
                value={username}
                onChangeText={text => setUsername(text)}
            />
            <TextInput
                style={{ height: 60, marginTop: 12, borderColor: 'gray', borderWidth: 1 }}
                placeholder='Email'
                value={email}
                placeholderTextColor={'gray'}

                onChangeText={text => setEmail(text)}
            />
            <TextInput
                style={{ height: 60, marginTop: 12, borderColor: 'gray', borderWidth: 1 }}
                placeholder='Passwprd'
                secureTextEntry
                value={password}
                placeholderTextColor={'gray'}

                onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity
                onPress={handleLogin }
                style={{
                    backgroundColor: '#000',
                    borderRadius: 20,
                    padding: 16,
                    marginTop: 18,
                    width: '100%'
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

export default SignUpScreen