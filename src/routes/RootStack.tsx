import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Home from '../screens/Home';
import SafetyAuditForm from '../screens/SafetyAuditForm';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SafetyAuditForm" component={SafetyAuditForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStack;
