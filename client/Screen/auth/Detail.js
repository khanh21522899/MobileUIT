import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { getRestaurantById } from '../../serverConnect/index'
import { useNavigation } from '@react-navigation/native'


const Detail = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { id } = route.params
  console.log('idofResatDetatail:', id)

  const [restaurant, setRestaurant] = useState(null); // Initialize with null
 const getData = async () => {
    try {
      const result = await getRestaurantById(id)
      setRestaurant(result?.data?.restaurant);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {restaurant ? (
          <>
            <Image source={{ uri: restaurant.images[0] }} style={styles.image} />
            <Text style={styles.title}>{restaurant.name}</Text>
            <Text style={styles.info}>Address: {restaurant.address}</Text>
            <Text style={styles.info}>Phone: {restaurant.phone}</Text>
          </>
        ) : (
          <Text>Loading...</Text>
        )}

        <TouchableOpacity style={styles.reservationButton} onPress={() => navigation.navigate('Reservation', {id} )}>
          <Text style={styles.buttonText}>Reservation</Text>
        </TouchableOpacity>

      </ScrollView>

    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  scrollViewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    alignItems: 'center',
    textAlign: 'center',

  },
  info: {
    fontSize: 16,
    margin: 10,
    textAlign: 'center',
    alignItems: 'center',
  },
  reservationButton: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
}
});
