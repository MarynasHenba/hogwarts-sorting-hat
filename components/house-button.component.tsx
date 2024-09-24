import React from 'react';
import {Image, Pressable, StyleSheet, Text} from 'react-native';
import {useSortingStore} from '../store/sorting.store';
import {Character, House} from '../shared/types';
import {Surface} from 'react-native-paper';

type HouseButtonProps = {
  item: House;
  randomItem: Character | undefined;
  onRefresh: () => void;
};

const HouseButton = ({item, randomItem, onRefresh}: HouseButtonProps) => {
  const {
    total,
    interactedCharacters,
    success,
    failed,
    setTotal,
    setSuccess,
    setFailed,
    setInteractedCharacters,
  } = useSortingStore();

  const pushNewCharacter = (updatedCharacter: Character) => {
    if (interactedCharacters.every(el => el.id !== updatedCharacter.id)) {
      const newList = [...(interactedCharacters || []), updatedCharacter];
      setInteractedCharacters(
        newList.map(el =>
          randomItem?.id === el.id
            ? {
                ...updatedCharacter,
                attempts: el?.attempts ? el.attempts + 1 : 1,
              }
            : el,
        ),
      );
    } else {
      setInteractedCharacters(
        interactedCharacters.map(el =>
          randomItem?.id === el.id
            ? {
                ...updatedCharacter,
                attempts: el?.attempts ? el.attempts + 1 : 1,
              }
            : el,
        ),
      );
    }
  };

  const onButtonPress = () => {
    const isGuessedCorrectly = item.name === randomItem?.house;
    const updatedCharacter = randomItem ? {...randomItem, guessed: isGuessedCorrectly} : {};

    if (isGuessedCorrectly) {
      setSuccess(success + 1);
      onRefresh();
    } else {
      setFailed(failed + 1);
    }

    setTotal(total + 1);
    pushNewCharacter(updatedCharacter);
  };

  return (
    <Surface style={styles.surface} elevation={4}>
      <Pressable style={styles.houseButton} onPress={onButtonPress}>
        <Image style={styles.houseIcon} source={{uri: item?.image}} />
        <Text>{item?.name}</Text>
      </Pressable>
    </Surface>
  );
};

export default HouseButton;

const styles = StyleSheet.create({
  houseIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  houseButton: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  surface: {
    padding: 5,
  },
});
