import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from '../screens/MapScreen/MapScreen';
import Permission from '../screens/Permission';
import FlagScreen from '../screens/FlagScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import useAuth from '../hooks/useAuth';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

function NativeStack() {
  const { user_firebase } = useSelector(state => state.user_firebase)
  
  if(  user_firebase !== undefined  ){
    return (
      <Stack.Navigator
      screenOptions={
          {
              headerShown: false
          }
      }
      >
       <Stack.Screen name="Permission" component={Permission} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="FlagScreen" component={FlagScreen} />  
      </Stack.Navigator>
    );
  }else{
    return (
      <Stack.Navigator
      screenOptions={
          {
              headerShown: false
          }
      }
      >
       <Stack.Screen name="LoginScreen" component={LoginScreen} />
       <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      </Stack.Navigator>
    );
  }
  
}

export default NativeStack;