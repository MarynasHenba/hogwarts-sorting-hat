import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {
  BottomNavParamList,
  Character,
  RootStackParamList,
} from '../shared/types';
import {Button, Card, Chip, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

const ListCard = (item: Character) => {
  const stackNavigation =
    useNavigation<BottomTabNavigationProp<RootStackParamList>>();
  const bottomNavigation =
    useNavigation<BottomTabNavigationProp<BottomNavParamList>>();

  return (
    <Card
      onPress={() => {
        stackNavigation.navigate('Details', {character: item});
      }}>
      <Card.Content style={styles.contentWrapper}>
        {item?.image ? (
          <Image style={styles.image} source={{uri: item.image}} />
        ) : (
          <Image
            style={styles.image}
            source={require('../shared/assets/images/placeholder-image.png')}
          />
        )}
        <View style={styles.textContent}>
          <Text variant="titleMedium">{item.name}</Text>

          {item.hasOwnProperty('guessed') && (
            <>
              {item.guessed ? (
                <Chip style={{width: 110}} icon="check">
                  Guessed
                </Chip>
              ) : (
                <Chip style={{width: 110}} icon="cancel">
                  Failed
                </Chip>
              )}
            </>
          )}
          {item.attempts && (
            <Text variant="bodyMedium">Attempts: {item.attempts}</Text>
          )}
        </View>
        {item.hasOwnProperty('guessed') && !item.guessed && (
          <Card.Actions>
            <Button
              style={styles.buttonContent}
              compact
              icon="cached"
              mode="outlined"
              onPress={() =>
                bottomNavigation.navigate('Home', {character: item})
              }>
              Try again
            </Button>
          </Card.Actions>
        )}
      </Card.Content>
    </Card>
  );
};

export default ListCard;

const styles = StyleSheet.create({
  contentWrapper: {
    flexDirection: 'row',
    gap: 7,
  },
  textContent: {
    flexGrow: 1,
  },
  separator: {
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },
  buttonContent: {
    position: 'absolute',
    padding: 0,
    alignItems: 'center',
    bottom: 0,
    right: 0,
  },
});
