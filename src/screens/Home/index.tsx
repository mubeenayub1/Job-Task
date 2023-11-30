import React, { FC, useEffect, useState } from 'react';
import { View, Text, StatusBar, StyleSheet, TextInput, RefreshControl, Image, FlatList } from 'react-native';
import { Icon } from '@rneui/themed';

interface Gif {
  url: string;
  title: string;
}

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const [count, setCount] = useState<number>(15);
  const [data, setData] = useState<Gif[]>([]);
  const [search, setSearch] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    var requestOptions: RequestInit = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(`https://api.giphy.com/v1/gifs/trending?limit=${count}&api_key=hKd8RAuyG9yTm72kRFWoMZ7TrD4smRQk`, requestOptions)
      .then(response => response.text())
      .then(result => {
        const data = JSON.parse(result);
        if (data?.meta?.status === 200) {
          setCount(count + 15);
          setData(data?.data);
        }
      })
      .catch(error => console.log('error', error));
  };

  const searchData = () => {
    var requestOptions: RequestInit = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(`https://api.giphy.com/v1/gifs/search?q=${search}&limit=${count}&api_key=hKd8RAuyG9yTm72kRFWoMZ7TrD4smRQk`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log('search data ', result);
        const data = JSON.parse(result);
        if (data?.meta?.status === 200) {
          setCount(count + 15);
          setData(data?.data);
        }
      })
      .catch(error => console.log('error', error));
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getData();
      setRefreshing(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <View style={styles.header}>
        <Icon name="arrowleft" type="antdesign" color={'transparent'} />
        <Text style={styles.headertxt}>Trending Gifs</Text>
        <Text
          style={{ color: 'black', fontSize: 12 }}
          onPress={() => navigation.navigate('feedback')}>
          Feedback?
        </Text>
      </View>
      <View style={styles.search}>
        <TextInput
          placeholder="Search gifs"
          style={styles.searchtxt}
          value={search}
          onChangeText={txt => setSearch(txt)}
        />
        <Icon
          name="search1"
          type="antdesign"
          color={'grey'}
          size={22}
          onPress={() => searchData()}
        />
      </View>
      <FlatList
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={data}
        renderItem={({ item }: { item: Gif }) => {
          return (
            <View style={styles.card}>
              <Image style={styles.carimg} resizeMode='contain' source={{ uri: item?.images?.original?.url }} />
              <Text style={styles.cardtxt}>{item?.title}</Text>
            </View>
          );
        }}
        onEndReached={() => {
          getData();
        }}
        onEndReachedThreshold={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
  },
  headertxt: { color: 'black', fontSize: 18, fontWeight: '600' },
  search: {
    height: 50,
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: 25,
    backgroundColor: '#F3F4FB',
    marginVertical: 10,
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
  },
  searchtxt: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
    width: '80%',
    height: '100%',
  },
  card: {
    height: 100,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#F3F4FB',
    marginTop: 10,
    flexDirection: 'row',
    borderRadius: 10,
  },
  cardtxt: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
    marginHorizontal: 10,
    paddingVertical: 10,
    width: '60%',
  },
  carimg: {
    height: 100,
    width: 120,
    backgroundColor: '#BABBC3',
    borderRadius: 10,
  },
});

export default HomeScreen;
