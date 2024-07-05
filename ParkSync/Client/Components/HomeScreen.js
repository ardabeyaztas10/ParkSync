import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.topRightCorner} />
      <View style={styles.bottomLeftCorner} />
      <Text style={styles.title}>ParkSync'e Hoş Geldiniz</Text>
      <TouchableOpacity
        style={[styles.button, styles.loginButton]}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.signupButton]}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.buttonText}>Kayıt Ol</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
    position: 'relative', 
  },
  title: {
    marginBottom: windowHeight * 0.05,
    fontSize: windowWidth * 0.06,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  button: {
    width: windowWidth * 0.7,
    height: windowHeight * 0.06,
    borderRadius: windowHeight * 0.03,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: windowHeight * 0.02,
  },
  loginButton: {
    backgroundColor: '#1e90ff',
  },
  signupButton: {
    backgroundColor: '#4caf50',
  },
  buttonText: {
    fontSize: windowWidth * 0.04,
    fontWeight: 'bold',
    color: '#fff',
  },
  topRightCorner: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: '#1e90ff',
    borderBottomLeftRadius: 50,
  },
  bottomLeftCorner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 50,
    height: 50,
    backgroundColor: '#4caf50',
    borderTopRightRadius: 50,
  },
});