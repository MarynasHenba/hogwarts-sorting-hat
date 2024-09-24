import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import HomeTabs from './components/home-tabs.component';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Details from './screens/details.screen';
import {RootStackParamList} from './shared/types';
import Header from './components/header.component';
import {MD2Colors} from 'react-native-paper';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={'Main'}
            component={HomeTabs}
            options={{header: Header}}
          />
          <Stack.Screen
            name={'Details'}
            component={Details}
            options={({route}) => ({
              headerTitle: route.params.character?.name,
              headerStyle: {backgroundColor: MD2Colors.deepPurple50},
              headerTintColor: MD2Colors.black,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
