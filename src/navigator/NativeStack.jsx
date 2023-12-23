import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from '../screens/MapScreen/MapScreen';
import Permission from '../screens/Permission';

const Stack = createNativeStackNavigator();

function NativeStack() {
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

    </Stack.Navigator>
  );
}

export default NativeStack;