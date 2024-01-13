import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../LoginScreen/firebase'
import Icon from 'react-native-vector-icons/Feather';

const SignUpScreen = NativeStack => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isUsernameValid, setIsUsernameValid] = useState(true)
    const [isEmailValid, setIsEmailValid] = useState(true)
    const [isPasswordValid, setIsPasswordValid] = useState(true)
    const handleLogin = async () => {
        var isAllValid = true
        if (!username) {
            isAllValid = false
            setIsUsernameValid(false)
        } else {
            if (!regexSpecialCharactes(username)) {
                isAllValid = false
                return Alert.alert(
                    "Username invalido",
                    "Tu username no debe contener caracteres especiales.")
            }
        }

        if (!email) {
            isAllValid = false
            setIsEmailValid(false)
        } else {
            if (!regexEmail(email)) {
                isAllValid = false
                return Alert.alert(
                    "Email incorrecto",
                    "El correo debe debe ser valido.")
            }
        }

        if (!password) {
            isAllValid = false
            setIsPasswordValid(false)
        } else {
            if (password.length < 6) {
                isAllValid = false
                return Alert.alert(
                    "Contra incorrecta",
                    "La contra debe contener al menos 6 caracteres")
            }
        }

        if (isAllValid) {
            try {
                await createUserWithEmailAndPassword(auth, email, password)
            } catch (error) {
                Alert.alert(
                    "Create account failed",
                    "Please insert a valid email and password",
                )
                console.log(error.message)
            }
        }

    }

    const regexSpecialCharactes = (username) => {
        const specialCharactesRegex = /^[a-zA-Z0-9\s]+$/
        if (specialCharactesRegex.test(username)) {
            return true
        } else {
            return false
        }
    }
    const regexEmail = (email) => {
        const emailRegex = /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/
        if (emailRegex.test(email)) {
            return true
        } else {
            return false
        }
    }

    return (
        <View style={{ flex: 1, padding: 18, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
                onPress={() => {
                    NativeStack.navigation.goBack();
                }}
                style={{
                    backgroundColor: '#000',
                    borderRadius: 24,
                    position: 'absolute',
                    top: 60,
                    left: 10,
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',

                }}>
                <Icon name="arrow-left" size={30} color="#fff" />
            </TouchableOpacity>

            <TextInput
                style={{
                    width: '100%',
                    height: 60,
                    marginTop: 12,
                    borderColor: isUsernameValid ? 'gray' : '#ef5350',
                    paddingStart: 16,
                    borderRadius: 10,
                    borderWidth: 1,
                    color: isUsernameValid ? '#000' : '#ef5350'
                }}
                autoCapitalize='none'
                placeholder='Create a username'
                value={username}
                placeholderTextColor={isUsernameValid ? 'gray' : '#ef5350'}
                onChangeText={text => {
                    setIsUsernameValid(true)
                    setUsername(text)

                }
                }
            />
            <TextInput
                style={{
                    width: '100%',
                    height: 60,
                    marginTop: 12,
                    borderColor: isEmailValid ? 'gray' : '#ef5350',
                    paddingStart: 16,
                    borderRadius: 10,
                    borderWidth: 1,
                    color: isEmailValid ? '#000' : '#ef5350'
                }}
                autoCapitalize='none'
                placeholder='Insert your email'
                value={email}
                placeholderTextColor={isEmailValid ? 'gray' : '#ef5350'}
                onChangeText={text => {
                    setIsEmailValid(true)
                    setEmail(text)

                }
                }
            />
            <TextInput
                style={{
                    width: '100%',
                    height: 60,
                    marginTop: 12,
                    borderColor: isPasswordValid ? 'gray' : '#ef5350',
                    paddingStart: 16,
                    borderRadius: 10,
                    borderWidth: 1,
                    color: isPasswordValid ? '#000' : '#ef5350'
                }}
                secureTextEntry
                autoCapitalize='none'
                placeholder='Insert your password'
                value={password}
                placeholderTextColor={isPasswordValid ? 'gray' : '#ef5350'}
                onChangeText={text => {
                    setIsPasswordValid(true)
                    setPassword(text)
                }
                }
            />
            <TouchableOpacity
                onPress={handleLogin}
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