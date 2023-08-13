import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import axios from 'axios';
import {useQuery} from '@tanstack/react-query';

export default function News() {
  const {data, isLoading, isError, refetch} = useQuery(['news'], () =>
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?category=${category}&country=in&apiKey=0a896ee86f6b404b8a695b5e43449f30`,
      )
      .then(resp => resp.data),
  );

  if(isLoading){
    return(
      <View>
        <Text>Loading.....</Text>
      </View>
    )
  }

  if(isError){
    return(
      <View>
        <Text>Loading.....</Text>
      </View>
    )
  }

  useEffect(() => {
    refetch();
  }, []);

  const openNews = url => {
    Linking.openURL(url).catch(error =>
      console.error('An error occurred: ', error),
    );
  };

  const currentDate = new Date();
  const day = currentDate.getDay();
  const date = currentDate.getDate();
  const month = currentDate.getMonth();

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const currentDayName = dayNames[day];

  const monthName = monthNames[month];

  const [category, setCategory] = useState('general');

  const articles = data?.articles || [];

  const inputAccessoryViewID = 'inputAccessoryViewID';

  return (
    <>
      <View style={styles.titleContainer}>
        <Text>Notizia</Text>
        <Text>{`${currentDayName}, ${date} ${monthName}`}</Text>
      </View>
      <View style={styles.searchBox}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <TextInput
              style={styles.searchInput}
              onChangeText={setCategory}
              placeholder={'Enter Category'}
              inputAccessoryViewID={inputAccessoryViewID}
              placeholderTextColor="#000000"
            />
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>

        <Text style={styles.searchBtn} onPress={refetch}>
          Search
        </Text>
      </View>
      <View>
        {articles.map((news, key) => (
          <>
            <View style={styles.newsContent}>
              <View style={styles.newsImageContainer}>
                <Image
                  key={key}
                  style={styles.newsImage}
                  source={{
                    uri: news.urlToImage,
                  }}
                />
              </View>
              <View style={styles.newDataContainer}>
                <Text style={styles.channelName}>{news.source.name}</Text>
                <Text style={styles.newsPublish}>{news.publishedAt}</Text>
                <Text style={styles.newsTitle}>{news.title}</Text>
                <Text style={styles.newsDescription}>
                  - {news.content && news.content.slice(0, 200)}
                </Text>
                <Text
                  style={styles.readMoreBtn}
                  onPress={() => openNews(news.url)}>
                  Read More
                </Text>
              </View>
            </View>
          </>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 17,
  },
  newsContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    width: 'auto',
    marginBottom: 40,
  },

  searchBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 20,
    marginTop: 20,
  },

  searchInput: {
    padding: 15,
    padding: 10,
    fontSize: 12,
    width: '80%',
    borderWidth: 1,
  },

  searchBtn: {
    backgroundColor: '#000000',
    color: '#ffffff',
    padding: 10,
    fontSize: 12,
  },

  newsImage: {
    width: 400,
    height: 220,
    objectFit: 'cover',
    borderRadius: 3,
  },

  newDataContainer: {
    width: 400,
  },

  channelName: {
    marginVertical: 9,
    fontSize: 16,
    fontWeight: '700',
  },

  newsPublish: {
    fontSize: 16,
    fontWeight: '700',
  },

  newsTitle: {
    fontSize: 20,
    letterSpacing: 1,
    fontWeight: 'bold',
    marginVertical: 9,
  },

  newsDescription: {
    fontSize: 18,
    letterSpacing: 1,
  },

  readMoreBtn: {
    color: '#ffffff',
    marginVertical: 15,
    backgroundColor: '#000000',
    textAlign: 'center',
    padding: 12,
    fontWeight: '600',
  },
});
