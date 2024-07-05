import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'; 

const windowWidth = Dimensions.get('window').width;

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handleSignup = async () => {
    Keyboard.dismiss();

    if (!email || !password || !username) {
      Alert.alert('Hata','Lütfen bütün alanları doldurun.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.58:3000/register', {
        userName: username,
        email: email,
        password: password
      });

      if (response.data.message) {
        Alert.alert('Başarılı', response.data.message);
        navigation.navigate('Home');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        Alert.alert('Hata', error.response.data.error);
      } else {
        Alert.alert('Hata', 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.backgroundShapes}>
          <View style={styles.shape1} />
          <View style={styles.shape2} />
          <View style={styles.shape3} />
        </View>
        <Text style={styles.title}>Hesabınızı Oluşturun</Text>
        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="#333333" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Kullanıcı Adı"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => emailInputRef.current.focus()}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="#333333" style={styles.icon} />
          <TextInput
            ref={emailInputRef}
            style={styles.input}
            placeholder="E-posta"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => passwordInputRef.current.focus()}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#333333" style={styles.icon} />
          <TextInput
            ref={passwordInputRef}
            style={styles.input}
            placeholder="Şifre"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            returnKeyType="done"
            onSubmitEditing={handleSignup}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSignup}
        >
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 20,
    position: 'relative',
  },
  backgroundShapes: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', 
  },
  shape1: {
    width: windowWidth,
    height: windowWidth * 0.5,
    backgroundColor: '#1e90ff',
    position: 'absolute',
    top: -windowWidth * 0.1,
    left: -windowWidth * 0.2,
    transform: [{ rotate: '45deg' }],
    blurRadius: 10, 
  },
  shape2: {
    width: windowWidth * 0.6,
    height: windowWidth * 0.6,
    backgroundColor: '#1e90ff',
    position: 'absolute',
    bottom: -windowWidth * 0.2,
    right: -windowWidth * 0.3,
    transform: [{ rotate: '45deg' }],
    blurRadius: 10,
  },
  shape3: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.4,
    backgroundColor: '#1e90ff',
    position: 'absolute',
    top: -windowWidth * 0.2,
    right: -windowWidth * 0.1,
    transform: [{ rotate: '-45deg' }],
    blurRadius: 10,
  },
  title: {
    marginBottom: 30,
    fontSize: windowWidth * 0.08,
    fontWeight: 'bold',
    color: '#555555',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    maxWidth: 400,
    height: 50,
    borderColor: '#1e90ff',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: windowWidth * 0.04,
    color: '#333333',
  },
  button: {
    width: '80%',
    maxWidth: 400,
    height: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: windowWidth * 0.05,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});