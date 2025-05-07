import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';

const Tab = createBottomTabNavigator();

export default function Layout() {
  return (
      <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#1639dd',
            tabBarInactiveTintColor: 'gray',
          }}>
        <Tab.Screen
            name="Current Location"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                  <Ionicons name="home" color={color} size={size} />
              ),
            }}
        />
        <Tab.Screen
            name="Other Cities"
            component={SearchScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                  <Ionicons name="search" color={color} size={size} />
              ),
            }}
        />
      </Tab.Navigator>
  );
}
