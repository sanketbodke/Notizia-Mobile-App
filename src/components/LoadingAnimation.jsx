import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function LoadingAnimation() {
  return (
    <View>
      <Text style={styles.loadingText}>LoadingAnimation</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  loadingText:{
    marginTop: 300
  }
})