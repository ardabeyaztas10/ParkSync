import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import FeatherIcon from 'react-native-vector-icons/Feather';

const windowWidth = Dimensions.get('window').width;

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSignUp = async () => {
    if (!username || !password) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.58:3000/login', {
        userName: username,
        password: password
      });

      if (response.data.message) {
        navigation.navigate('Park', { userName: username }); 
      }
    } catch (error) {
      Alert.alert('Hata', 'Bir hata oluştu. Kullanıcı adı veya şifre hatalı.');
    }
  };

  const focusPasswordInput = () => {
    passwordInputRef.current.focus();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.shapesContainer}>
          <View style={[styles.shape, styles.upperLeft]} />
          <View style={[styles.shape, styles.upperRight]} />
          <View style={[styles.shape, styles.lowerLeft]} />
          <View style={[styles.shape, styles.lowerRight]} />
        </View>
        <Text style={styles.title}>Giriş Yap</Text>
        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="#333" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Kullanıcı Adı"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={focusPasswordInput}
            ref={usernameInputRef}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#333" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Şifre"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            returnKeyType="done"
            onSubmitEditing={handleSignUp}
            ref={passwordInputRef}
          />
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSignUp}
        >
          <Text style={styles.buttonText}>Giriş</Text>
        </TouchableOpacity>
        <View style={styles.loginText}>
          <Text>Hesabınız yok mu? </Text>
          <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>Kaydolun</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 20,
    position: 'relative',
  },
  title: {
    marginBottom: 30,
    fontSize: windowWidth * 0.08,
    fontWeight: 'bold',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    maxWidth: 400,
    height: 50,
    borderBottomColor: '#333',
    borderBottomWidth: 2,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: windowWidth * 0.04,
    color: '#333',
  },
  button: {
    width: '80%',
    maxWidth: 400,
    height: 50,
    backgroundColor: '#1e90ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: windowWidth * 0.05,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  loginText: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  link: {
    color: '#1e90ff',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  shapesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: -1,
  },
  shape: {
    width: 100,
    height: 100,
    backgroundColor: '#1e90ff',
    position: 'absolute',
    opacity: 0.6,
    borderRadius: 0,
  },
  upperLeft: {
    top: 0,
    left: 0,
  },
  upperRight: {
    top: 0,
    right: 0,
  },
  lowerLeft: {
    bottom: 0,
    left: 0,
  },
  lowerRight: {
    bottom: 0,
    right: 0,
  },
});