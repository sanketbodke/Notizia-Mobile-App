import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image, Linking, Button} from 'react-native';
import axios from 'axios';
import {useQuery} from '@tanstack/react-query';

export default function News() {
  const {data, refetch} = useQuery(
    ['news'],
    () =>
      axios
        .get(
          'https://newsapi.org/v2/top-headlines?category=general&country=in&apiKey=0a896ee86f6b404b8a695b5e43449f30',
        )
        .then(resp => resp.data),
  );

  useEffect(() => {
    refetch();
  }, []);

  const openNews = (url)=>{
    Linking.openURL(url)
    .catch((error) => console.error('An error occurred: ', error));
  }

  return (
    <>
      <View>
        <Text>Time Heading etc....</Text>
      </View>
      <View style={styles.newsContainer}>
        {data.articles &&
          data.articles.map((news, index) => (
            <>
              <View style={styles.newsContent}>
                <View style={styles.newsImageContainer}>
                  <Image
                    style={styles.newsImage}
                    source={{
                      uri: news.urlToImage,
                    }}
                  />
                </View>
                <View style={styles.newDataContainer}>
                  <Text style={styles.newsPublish}>{news.publishedAt}</Text>
                  <Text style={styles.newsTitle}>{news.title}</Text>
                  <Text style={styles.newsDescription}>
                    {news.content && news.content.slice(0, 200)}
                  </Text>
                  <Text style={styles.readMoreBtn} onPress={()=> openNews(news.url)}>Read More</Text>
                </View>
              </View>
            </>
          ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  newsContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    width: 'auto',
    marginBottom: 40,
  },

  newsImage: {
    width: 400,
    height: 190,
    objectFit: 'cover',
    borderRadius: 3,
  },

  newDataContainer: {
    width: 400,
  },

  newsTitle: {
    fontSize: 20,
    letterSpacing: 1,
    fontWeight: 'bold',
    marginVertical: 9
  },

  newsDescription: {
    fontSize: 18,
    letterSpacing: 1
  },

  readMoreBtn:{
    color: '#ffffff',
    marginVertical: 15,
    backgroundColor: '#000003',
    textAlign: 'center',
    padding: 12,
    fontWeight: '600',
  }
});
