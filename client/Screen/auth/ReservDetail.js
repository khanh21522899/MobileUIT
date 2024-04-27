import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getReservationById, deleteReservation } from '../../serverConnect/index';
import { useNavigation } from '@react-navigation/native';

const ReservDetail = () => {
    const navigation = useNavigation();
    const [reservation, setReservation] = useState(null);
    const [loading, setLoading] = useState(true);

    const route = useRoute();
    const { id } = route.params;

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getReservationById(id);
            setReservation(response.data?.reservation);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCancelReservation = async () => {
        try {
            await deleteReservation(id);
            Alert.alert('Reservation cancelled successfully');
            // Handle success, navigate to another screen, show a message, etc.
            navigation.navigate('Home');
        } catch (error) {
            console.log(error);
            // Handle error
        }
    };

    const renderReservationDetail = useMemo(() => {
        if (!reservation) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="blue" />
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Reservation Detail</Text>
                <Text>ID: {reservation._id}</Text>
                <Text>Phone: {reservation.phone}</Text>
                <Text>Arrival Time: {reservation.arrivalTime}</Text>
                <Text>Quantity: {reservation.quantity}</Text>
                <Text>Status: {reservation.status}</Text>
                <Text>Restaurant Name: {reservation.restaurant.name}</Text>
                <Text>Restaurant Address: {reservation.restaurant.address}</Text>
                {reservation.restaurant.images.length > 0 && (
                    <Image source={{ uri: reservation.restaurant.images[0] }} style={styles.image} />
                )}
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancelReservation}>
                    <Text style={styles.cancelButtonText}>Cancel Reservation</Text>
                </TouchableOpacity>
            </View>
        );
    }, [reservation]);

    return renderReservationDetail;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
        margin: 5,
    },
    cancelButton: {
        marginTop: 20,
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignSelf: 'center',
    },
    cancelButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ReservDetail;
