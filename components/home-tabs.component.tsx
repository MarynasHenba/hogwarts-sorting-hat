import * as React from 'react';
import HomeScreen from '../screens/home.screen';
import ListScreen from '../screens/list.screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigation} from 'react-native-paper';
import {BottomNavParamList} from '../shared/types';
import {CommonActions} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator<BottomNavParamList>();

const BottomTabBar = ({navigation, state, descriptors, insets}: any) => {
  return (
    <BottomNavigation.Bar
      navigationState={state}
      safeAreaInsets={insets}
      onTabPress={({route, preventDefault}) => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (event.defaultPrevented) {
          preventDefault();
        } else {
          navigation.dispatch({
            ...CommonActions.navigate(route?.name, route?.params),
            target: state.key,
          });
        }
      }}
      renderIcon={({route, focused, color}) => {
        const {options} = descriptors[route.key];
        if (options.tabBarIcon) {
          return options.tabBarIcon({focused, color, size: 24});
        }
        return null;
      }}
      getLabelText={({route}) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.title;

        return label;
      }}
    />
  );
};

const Icons = ({focused, color, size, route}: any) => {
  let iconName = '';
  if (route?.name === 'Home') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route?.name === 'List') {
    iconName = focused ? 'list' : 'list-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: props => <Icons {...props} route={route} />,
        tabBarInactiveTintColor: 'gray',
      })}
      tabBar={props => <BottomTabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="List"
        component={ListScreen}
        options={{
          tabBarLabel: 'List',
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
