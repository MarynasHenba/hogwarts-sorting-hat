import {FlatList, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {useSortingStore} from '../store/sorting.store';
import {Character} from '../shared/types';
import CounterBlock from '../components/counter.component';
import {Searchbar, MD2Colors} from 'react-native-paper';
import ListCard from '../components/list-card.component';

const ListScreen = () => {
  const {interactedCharacters} = useSortingStore();
  const [searchInput, setSearchInput] = useState('');

  const renderListItem = (item: Character) => {
    return <ListCard {...item} />;
  };

  return (
    <View style={styles.container}>
      <CounterBlock />
      <Searchbar
        placeholder="Type to search for characters"
        onChangeText={setSearchInput}
        value={searchInput}
      />
      <FlatList
        style={styles.list}
        data={interactedCharacters.filter(el =>
          el.name.toLowerCase().includes(searchInput.toLowerCase()),
        )}
        renderItem={({item}) => renderListItem(item)}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: MD2Colors.white,
    alignItems: 'stretch',
    justifyContent: 'center',
    gap: 20,
  },
  list: {
    padding: 5,
  },
  separator: {
    marginBottom: 10,
  },
});
