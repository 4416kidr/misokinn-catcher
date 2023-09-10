import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Footer = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Top')}>
        <Image source={require('misokin-catcher-front/image/map-icon.png')} style={styles.icon} />
        <Text style={styles.linkText}>Map</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Review')}>
        <Image source={require('misokin-catcher-front/image/review-icon.png')} style={styles.icon} />
        <Text style={styles.linkText}>口コミ投稿</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '10%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '20%',
    backgroundColor: '#fff',
  },
  link: {
    padding: 10,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 16,
    color: '#333',
  },
  icon: {
    width: 44,
    height: 44,
  },
});

export default Footer;
