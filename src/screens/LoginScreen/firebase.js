// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, initializeAuth,getReactNativePersistence} from 'firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCckFhKjsNp3lPJhjK_HL9JNAbPuLRWQPo",
  authDomain: "mapsidat.firebaseapp.com",
  projectId: "mapsidat",
  storageBucket: "mapsidat.appspot.com",
  messagingSenderId: "797283794425",
  appId: "1:797283794425:web:6d9ab0176c355a9e1e5128"
};

const app = initializeApp(firebaseConfig);

 export const auth = initializeAuth(app, {

  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
