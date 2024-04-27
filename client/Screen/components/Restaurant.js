import { StyleSheet, FlatList, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

import { getRestaurants } from '../../serverConnect/index'

const Restaurant = () => {
    const [restaurants, setRestaurants] = useState([])
    const navigation = useNavigation()

    const getData = async () => {
        try {
            const response = await getRestaurants()
            setRestaurants(response.data?.restaurants)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <View style={{ marginTop: 10 }}>
            <FlatList
                data={restaurants}
                renderItem={({ item }) => (
                    <View style={styles.restaurantContainer}>
                        {item.images.length > 0 && (
                            <TouchableOpacity onPress={() => navigation.navigate('Detail', {id: item?._id})}>
                                <Image
                                    source={{ uri: item.images[0] }} // Use the first image URL
                                    style={styles.imageStyle}
                                />
                            </TouchableOpacity>
                        )}
                        <Text style={styles.textStyle}>{item.name}</Text>
                        <TouchableOpacity style={styles.reservationButton} onPress={() => navigation.navigate('Detail', {id: item?._id})}>
                            <Text style={styles.buttonText}>Reservation</Text>
                        </TouchableOpacity>
                    </View>
                )}
                vertical
                contentContainerStyle={{ paddingHorizontal: 10 }}
                keyExtractor={(item, index) => item._id.toString() || index.toString()}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    restaurantContainer: {
        margin: 10,
        alignItems: 'center'
    },
    imageStyle: {
        width: 380,
        height: 180,
        borderRadius: 10,
        marginBottom: 10
    },
    textStyle: {
        fontSize: 16,
    },
    reservationButton: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 20,
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    }
})

export default Restaurant
