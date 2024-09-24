import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {houses} from '../shared/consts';
import {BottomNavParamList, Character, House} from '../shared/types';
import {useSortingStore} from '../store/sorting.store';
import CounterBlock from '../components/counter.component';
import HouseButton from '../components/house-button.component';
import {MD2Colors, Text} from 'react-native-paper';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

interface HomeScreenProps
  extends BottomTabScreenProps<BottomNavParamList, 'Home'> {}

const HomeScreen = ({route, navigation}: HomeScreenProps) => {
  const {characters, setCharacters} = useSortingStore();
  const [refreshing, setRefreshing] = useState(false);
  const [randomItem, setRandomItem] = useState<Character>();

  const fetchDataOnce = async () => {
    try {
      const response = await fetch(
        'https://hp-api.onrender.com/api/characters/students',
      );
      const json = await response.json();
      const filteredData = json.filter((item: Character) => item.house);
      setCharacters(filteredData);
      getRandomItem(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  const getRandomItem = useCallback((localData: any) => {
    if (localData.length > 0) {
      const randomIndex = Math.floor(Math.random() * localData.length);
      setRandomItem(localData[randomIndex]);
    }
    setRefreshing(false);
  }, []);

  const checkForCharacterParam = () => {
    if (route?.params?.character) {
      setRandomItem(route?.params?.character);
    } else {
      getRandomItem(characters);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    navigation.setParams({character: undefined});
    getRandomItem(characters);
  };

  useEffect(() => {
    if (!characters.length) {
      fetchDataOnce();
    } else {
      checkForCharacterParam();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route?.params?.character]);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <CounterBlock />
      {randomItem ? (
        <View style={styles.wrapper}>
          {randomItem.image ? (
            <Image style={styles.image} source={{uri: randomItem.image}} />
          ) : (
            <Image
              style={styles.image}
              source={require('../shared/assets/images/placeholder-image.png')}
            />
          )}
          <Text variant="headlineLarge">{randomItem.name}</Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
      <View style={styles.buttonWrapper}>
        {houses.map((item: House) => (
          <HouseButton
            item={item}
            randomItem={randomItem}
            onRefresh={onRefresh}
            key={item.id}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 20,
    backgroundColor: MD2Colors.white,
    gap: 20,
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  buttonWrapper: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: 230,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
});
