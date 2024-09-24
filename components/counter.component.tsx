import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useSortingStore} from '../store/sorting.store';
import {Card, Text} from 'react-native-paper';

const CounterBlock = () => {
  const {total, success, failed} = useSortingStore();

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">Total: {total}</Text>
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">Success: {success}</Text>
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">Failed: {failed}</Text>
        </Card.Content>
      </Card>
    </View>
  );
};

export default CounterBlock;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },
  card: {
    flexGrow: 1,
  },
});
