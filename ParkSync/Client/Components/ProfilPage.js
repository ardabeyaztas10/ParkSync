import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ToastAndroid } from 'react-native';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

export default function ProfileScreen({ navigation, route }) {
  const [userInfo, setUserInfo] = useState(null);
  const [editingEmail, setEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [editingPlate, setEditingPlate] = useState(false);
  const [newPlate, setNewPlate] = useState('');
  const [editingPassword, setEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userName = route.params.userName;
        const response = await axios.get(`http://192.168.1.58:3000/user-info/${userName}`);
        setUserInfo(response.data);
      } catch (error) {
        setErrorMessage('Kullanıcı bilgileri getirme hatası');
      }
    };

    fetchUserInfo();
  }, [route.params.userName]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrorMessage('');
      setSuccessMessage('');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [errorMessage, successMessage]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePlate = (plate) => {
    const plateRegex = /^[A-Z0-9]{1,10}$/;
    return plateRegex.test(plate);
  };

  const validatePassword = (newPassword) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(newPassword);
  };

  const updateEmail = async () => {
    try {
      if (!validateEmail(newEmail)) {
        setErrorMessage('Geçersiz e-posta adresi formatı');
        return;
      }

      const response = await axios.put(`http://192.168.1.58:3000/update-email/${userInfo.userName}`, { newEmail });
      setUserInfo({ ...userInfo, email: newEmail });
      setEditingEmail(false);
      setSuccessMessage('E-posta adresi başarıyla güncellendi');
    } catch (error) {
      setErrorMessage('E-posta adresi kullanılıyor');
    }
  };

  const updatePlate = async () => {
    try {
      if (!validatePlate(newPlate)) {
        setErrorMessage('Geçersiz plaka formatı');
        return;
      }

      const response = await axios.put(`http://192.168.1.58:3000/update-plate/${userInfo.userName}`, { newPlate });
      setUserInfo({ ...userInfo, plate: newPlate });
      setEditingPlate(false);
      setSuccessMessage('Plaka başarıyla güncellendi');
    } catch (error) {
      setErrorMessage('Plaka sisteme kayıtlı');
    }
  };

  const updatePassword = async () => {
    try {
      if (!validatePassword(newPassword)) {
        setErrorMessage('Şifre en az 8 karakter uzunluğunda olmalı ve en az bir büyük harf, bir küçük harf ve bir rakam içermelidir.');
        return;
      }
      const response = await axios.put(`http://192.168.1.58:3000/change-password/${userInfo.userName}`, { newPassword });
      setSuccessMessage('Şifreniz başarıyla güncellendi');
      setEditingPassword(false);
    } catch (error) {
      setErrorMessage('Şifre güncelleme hatası');
    }
  };
  
  const handleEditEmail = () => {
    setEditingEmail(true);
  };

  const handleEditPlate = () => {
    setEditingPlate(true);
  };

  const handleEditPassword = () => {
    setEditingPassword(true);
  };

  const deleteAccount = async () => {
    try {
      const response = await axios.delete(`http://192.168.1.58:3000/delete-user/${userInfo.userName}`);
      setSuccessMessage('Hesabınız başarıyla silindi');
      navigation.navigate('Home');
      ToastAndroid.show("Hesabınız başarıyla silindi", ToastAndroid.SHORT);
    } catch (error) {
      setErrorMessage('Hesap silme hatası');
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={Keyboard.dismiss} activeOpacity={1}>
      <Text style={styles.title}>Profil Bilgileri</Text>
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      {successMessage ? (
        <Text style={styles.successMessage}>{successMessage}</Text>
      ) : null}
      <View style={styles.userInfoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Kullanıcı Adı:</Text>
          <Text style={styles.value}>{userInfo ? userInfo.userName : ''}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>E-posta:</Text>
          {editingEmail ? (
            <View style={styles.editEmailContainer}>
              <TextInput
                style={styles.editEmailInput}
                value={newEmail}
                onChangeText={setNewEmail}
                placeholder="Yeni e-posta adresinizi girin"
              />
              <TouchableOpacity onPress={updateEmail} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>{"\u2713"}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setEditingEmail(false)} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>{"\u2715"}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Text style={styles.value}>{userInfo ? userInfo.email : ''}</Text>
              <TouchableOpacity onPress={handleEditEmail} style={styles.editButton}>
                <FontAwesome name="edit" size={width * 0.04} color="#333" />
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Plaka:</Text>
          {editingPlate ? (
            <View style={styles.editPlateContainer}>
              <TextInput
                style={styles.editPlateInput}
                value={newPlate}
                onChangeText={setNewPlate}
                placeholder="Yeni plakanızı girin"
              />
              <TouchableOpacity onPress={updatePlate} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>{"\u2713"}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setEditingPlate(false)} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>{"\u2715"}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Text style={styles.value}>{userInfo ? userInfo.plate : ''}</Text>
              <TouchableOpacity onPress={handleEditPlate} style={styles.editButton}>
                <FontAwesome name="edit" size={width * 0.04} color="#333" />
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Parola:</Text>
          {editingPassword ? (
            <View style={styles.editPasswordContainer}>
              <TextInput
                style={styles.editPasswordInput}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Yeni şifrenizi girin"
                secureTextEntry={true}
              />
              <TouchableOpacity onPress={updatePassword} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>{"\u2713"}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setEditingPassword(false)} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>{"\u2715"}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Text style={styles.value}>**********</Text>
              <TouchableOpacity onPress={handleEditPassword} style={styles.editButton}>
                <FontAwesome name="edit" size={width * 0.04} color="#333" />
              </TouchableOpacity>
            </>
          )}
        </View>
        <TouchableOpacity onPress={deleteAccount} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Hesabımı Sil</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cornerShapeTopLeft} />
      <View style={styles.cornerShapeBottomRight} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginBottom: height * 0.03,
    color: '#333',
  },
  userInfoContainer: {
    width: '100%',
  },
  infoItem: {
    marginBottom: height * 0.02,
    padding: width * 0.05,
    borderRadius: width * 0.04,
    backgroundColor: '#f9f9f9', 
    position: 'relative', 
  },
  label: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    marginBottom: height * 0.01,
    color: '#555',
  },
  value: {
    fontSize: width * 0.035,
    color: '#333',
  },
  errorMessage: {
    fontSize: width * 0.04,
    color: 'red',
    marginBottom: height * 0.01,
  },
  successMessage: {
    fontSize: width * 0.04,
    color: 'green',
    marginBottom: height * 0.01,
  },
  editButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  editEmailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editEmailInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  editPlateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editPlateInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  editPasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editPasswordInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#0056b3', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#b30000', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#333', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    justifyContent: 'center', 
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center', 
  },
  cornerShapeTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: width * 0.1,
    borderBottomWidth: height * 0.05,
    borderRightColor: 'transparent',
    borderBottomColor: '#dcdcdc', 
  },
  cornerShapeBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: width * 0.1,
    borderTopWidth: height * 0.05,
    borderLeftColor: 'transparent',
    borderTopColor: '#dcdcdc',
  },
});