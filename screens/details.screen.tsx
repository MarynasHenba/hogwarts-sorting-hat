import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../shared/types';
import {Card, Text} from 'react-native-paper';

interface DetailsProps
  extends NativeStackScreenProps<RootStackParamList, 'Details'> {}

const Details = ({route}: DetailsProps) => {
  const {character} = route.params;

  return (
    <Card style={styles.container}>
      <Card.Content style={styles.contentWrapper}>
        {character?.image ? (
          <Image style={styles.image} source={{uri: character.image}} />
        ) : (
          <Image
            style={styles.image}
            source={require('../shared/assets/images/placeholder-image.png')}
          />
        )}
        {character?.guessed ? (
          <View>
            {character?.name && (
              <Text variant="titleMedium">{character?.name}</Text>
            )}
            {character?.house && (
              <Text variant="titleMedium">
                House: <Text variant="bodyMedium">{character?.house}</Text>
              </Text>
            )}
            {character?.dateOfBirth && (
              <Text variant="titleMedium">
                Date of birth:{' '}
                <Text variant="bodyMedium">{character?.dateOfBirth}</Text>
              </Text>
            )}
            {character?.actor && (
              <Text variant="titleMedium">
                Actor: <Text variant="bodyMedium">{character?.actor}</Text>
              </Text>
            )}
          </View>
        ) : (
          <View>
            <Text variant="titleLarge">ACCESS DENIED</Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  contentWrapper: {
    flexDirection: 'row',
    columnGap: 10,
  },
  image: {
    width: 150,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 30,
  },
});
