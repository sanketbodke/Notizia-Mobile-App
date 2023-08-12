import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Navbar() {
  return (
    <View style={styles.navContainer}>
      <Text style={styles.logo}>Notizia</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    navContainer:{

    },
    logo:{
        color: '#ffffff',
        paddingTop: 10,
        paddingBottom: 26,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '600',
        letterSpacing: 1
    }
})