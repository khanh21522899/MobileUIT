import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, Modal } from 'react-native';
import { createReservation } from '../../serverConnect/index';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const Reservation = () => {
  const navigation = useNavigation();
  const [reservData, setReservData] = useState({
    phone: '',
    arrivalTime: '',
    quantity: '',
  });

  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility

  const route = useRoute();
  const { id } = route.params;
  console.log('restaurantId:', id);

  const handleChange = (name, value) => {
    setReservData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    // Check if any of the input fields are empty
  if (!reservData.phone || !reservData.arrivalTime || !reservData.quantity) {
    alert('Please fill in all fields');
    return; // Exit the function if any field is empty
  }
    // Show confirmation modal
    setModalVisible(true);
  };

  const handleConfirm = async () => {
    try {
      const response = await createReservation({
        ...reservData,
        id,
      });

      // Clear input
      setReservData({
        phone: '',
        arrivalTime: '',
        quantity: '',
      });

      // Hide modal
      setModalVisible(false);

      // Show success alert
      alert('Reservation created successfully')
      navigation.navigate('ReservDetail', { id: response.data.reservation._id })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Reservation</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={reservData.phone}
        onChangeText={(value) => handleChange('phone', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Arrival Time"
        value={reservData.arrivalTime}
        onChangeText={(value) => handleChange('arrivalTime', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={reservData.quantity}
        onChangeText={(value) => handleChange('quantity', value)}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.buttonStyle} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Reservation</Text>
      </TouchableOpacity>

      {/* Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Confirm Reservation</Text>
            <Text>Quantity: {reservData.quantity}</Text>
            <Text>Arrival Time: {reservData.arrivalTime}</Text>
            {/* Add other user info fields here */}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={{ ...styles.buttonStyle, backgroundColor: 'red' }}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.buttonStyle, backgroundColor: 'blue' }}
                onPress={handleConfirm}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonStyle: {
    width: '45%',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
  },
  // Modal styles
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
});

export default Reservation;
