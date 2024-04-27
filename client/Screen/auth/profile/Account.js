import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Account = () => {
  const navigation = useNavigation();

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (item.title === 'User Info') {
            navigation.navigate('UserInfo');
          } else if (item.title === 'Reservation History') {
            navigation.navigate('ReservationHistory');
          } else {
            // handleLogout()
          }
        }}>
        <View style={styles.itemContainer}>
          <Text style={styles.textStyle}>{item.title}</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="black" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={[
        { key: '1', title: 'User Info' },
        { key: '2', title: 'Reservation History' },
        { key: '3', title: 'Logout' }
      ]}
      renderItem={renderItem}
      ItemSeparatorComponent={renderSeparator}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

export default Account;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 10
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC'
  },
  textStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    flex: 1
  }
});
