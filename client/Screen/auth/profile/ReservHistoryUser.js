import { StyleSheet, FlatList, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getReservations, deleteReservation } from '../../../serverConnect/index';

const ReservHistoryUser = () => {
  const [reservations, setReservations] = useState([]);

  const getData = async () => {
    try {
      const response = await getReservations();
      setReservations(response.data?.reservations);
    } catch (error) {
      console.log(error);
    }
  };
  console.log('reservationsssss', reservations);

  const handleCancelReservation = async (id) => {
    try {
      // Call the cancelReservation API with the reservation ID
      await deleteReservation(id);
      // Update the reservations list by fetching the data again
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View>
      <Text>ReservHistory</Text>
      <FlatList
        data={reservations}
        renderItem={({ item }) => (
          <View>
            <Image
              source={{ uri: item.restaurant.images[0] }}
              style={{ width: 100, height: 100 }}
            />
            <Text>{item.restaurant.name}</Text>
            <Text>{item.restaurant.address}</Text>
            <Text>{item._id}</Text>
            <Text>{item.phone}</Text>
            <Text>{item.quantity}</Text>
            <Text>{item.status}</Text>
            {/* TouchableOpacity for cancelling reservation */}
            <TouchableOpacity style={styles.cancelButton} onPress={() => handleCancelReservation(item._id)}>
              <Text style={styles.cancelButtonText}>Cancel Reservation</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => item._id.toString() || index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
    alignSelf: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ReservHistoryUser;
