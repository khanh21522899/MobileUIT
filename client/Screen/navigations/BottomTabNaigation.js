import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../auth/Home'
import Search from '../auth/Search'
import Account from '../auth/profile/Account'
import AccountManage from '../AccountManage'
import ReservationHistory from '../auth/profile/ReservHistoryUser'
import Reservation from '../auth/Reservation'
import Detail from '../auth/Detail'
import ReservDetail from '../auth/ReservDetail'
import { Ionicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
            <Stack.Screen name="Reservation" component={Reservation} />
            <Stack.Screen name="Detail" component={Detail} />
            <Stack.Screen name="ReservDetail" component={ReservDetail} />
        </Stack.Navigator>
    )
}

const AccountStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Account" component={Account} />
            <Stack.Screen name="UserInfo" component={AccountManage} />
            <Stack.Screen name="ReservationHistory" component={ReservationHistory} />
        </Stack.Navigator>
    )
}

const screenOptions = {
    tabBarShơwLabel: false,
    tabBarHideOnKeyboard: true,
    tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 70
    }
}

const BottomTabNavigation = () => {

    return (

        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? 'home' : 'home-outline'}
                            size={24}
                            color={focused ? '#007bff' : '#808080'}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={'search-sharp'}
                            size={24}
                            color={focused ? '#007bff' : '#808080'}
                        />
                    )
                }}
            />
             <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? 'save' : 'save-outline'}
                            size={24}
                            color={focused ? '#007bff' : '#808080'}
                        />
                    )
                }}
            />
            <Tab.Screen
                name='Profile'
                component={AccountStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? 'person' : 'person-outline'}
                            size={24}
                            color={focused ? '#007bff' : '#808080'}
                        />
                    )
                }}
            />     
        </Tab.Navigator>

    )
}

export default BottomTabNavigation

