import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView } from 'react-native'
import React from 'react'
import Navbar from './src/components/Navbar'
import News from './pages/News'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>

      <View>
        <SafeAreaView style={styles.nav}>
          <View>
            <StatusBar backgroundColor="#000000" barStyle="light-content" />
            <View>
              <Navbar />
            </View>
          </View>
        </SafeAreaView>
        <ScrollView>
          <News />
        </ScrollView>
      </View>

    </QueryClientProvider>
  )
}

const styles = StyleSheet.create({
  nav: {
    backgroundColor: '#000000',
  }
})