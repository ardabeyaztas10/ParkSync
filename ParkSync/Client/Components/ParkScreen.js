import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default function ParkScreen({ navigation, route }) {
  const [parkingLots, setParkingLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userName } = route.params;

  useEffect(() => {
    const fetchParkingSpots = async () => {
      try {
        const response = await axios.get('http://192.168.1.58:5000/parkingSpots');
        setParkingLots(response.data);
      } catch (error) {
        ToastAndroid.show('Park alanları getirme hatası', ToastAndroid.LONG);
      } finally {
        setLoading(false);
      }
    };

    const intervalId = setInterval(fetchParkingSpots, 10000);

    fetchParkingSpots();

    return () => clearInterval(intervalId);
  }, [userName]);

  const handleLogout = async () => {
    try {
      await axios.post('http://192.168.1.58:3000/logout');
      ToastAndroid.show("Çıkış yapıldı", ToastAndroid.SHORT);
      navigation.navigate('Home');
    } catch (error) {
      ToastAndroid.show('Oturumdan çıkış yaparken bir hata oluştu', ToastAndroid.LONG);
    }
  };

  const handleUserIconPress = () => {
    navigation.navigate('Profile', { userName: userName });
  };

  const renderParkingLot = ({ item }) => (
    <View style={styles.parkingLotContainer}>
      <Text style={styles.parkingLotText}>{item.parking_spot_label}</Text>
      <View style={styles.statusContainer}>
        <Icon name={item.status === 'Dolu' ? 'event-busy' : 'event-available'}
              size={24}
              color={item.status === 'Dolu' ? 'red' : 'green'}
        />
        <Text style={[styles.parkingLotText, item.status === 'Dolu' ? styles.occupied : styles.empty]}>
          {item.status}
        </Text>
      </View>
    </View>
  );

  const occupiedCount = parkingLots.filter(lot => lot.status === 'Dolu').length;
  const emptyCount = parkingLots.filter(lot => lot.status === 'Boş').length;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!userName) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Geçersiz kullanıcı adı</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userNameContainer}>
          <TouchableOpacity onPress={handleUserIconPress}>
            <FontAwesomeIcon name="user" size={24} color="black" style={styles.userIcon} />
          </TouchableOpacity>
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <FontAwesomeIcon name="sign-out" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <FlatList
          data={parkingLots}
          renderItem={renderParkingLot}
          keyExtractor={item => item.parking_spot_label}
          contentContainerStyle={styles.list}
        />
      </View>
      <View style={styles.countContainer}>
        <Text style={styles.countText}>Dolu Park Yeri Sayısı: {occupiedCount}</Text>
        <Text style={styles.countText}>Boş Park Yeri Sayısı: {emptyCount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
    color: 'black',
    marginLeft: 14, 
    fontWeight: 'bold', 
  },
  logoutButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 20,
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  list: {
    padding: 10,
  },
  parkingLotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  parkingLotText: {
    fontSize: 18,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  occupied: {
    color: 'red',
    marginLeft: 5,
    fontWeight: 'bold', 
  },
  empty: {
    color: 'green',
    marginLeft: 5,
    fontWeight: 'bold', 
  },
  countContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  countText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userIcon: {
    marginLeft: 10,
    fontSize: 28,
  },
});