import {Platform, StyleSheet, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {useSortingStore} from '../store/sorting.store';
import {Button, MD2Colors, Text} from 'react-native-paper';

const Header = (props: NativeStackHeaderProps) => {
  const {name} = props.route;
  const {resetStore} = useSortingStore();
  const insets = useSafeAreaInsets();
  let headerTitle = name;

  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top + (Platform.OS === 'ios' ? 5 : 22)},
      ]}>
      <Text variant="titleSmall" style={styles.text}>
        {headerTitle}
      </Text>
      <Button
        mode="contained"
        onPress={() => {
          resetStore();
        }}
        compact
        style={styles.button}>
        <Text style={styles.buttonText}>Reset</Text>
      </Button>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: MD2Colors.deepPurple50,
    paddingBottom: 10,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    alignSelf: 'center',
    flexGrow: 1,
  },
  button: {
    position: 'absolute',
    paddingHorizontal: 5,
    right: 15,
    bottom: 7,
  },
  buttonText: {
    color: MD2Colors.white,
  },
});
