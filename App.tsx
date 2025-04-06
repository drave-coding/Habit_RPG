import {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import './global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from 'screens/HomeScreen';
import { useStore } from './store/useStore';


const Stack = createStackNavigator();

const App = () => {
  const resetDailyData = useStore((state) => state.resetDailyData);

  useEffect(() => {
    // Trigger reset logic on app load
    resetDailyData();
  }, [resetDailyData]);
  return (
    
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
    
  );
}

export default App;
