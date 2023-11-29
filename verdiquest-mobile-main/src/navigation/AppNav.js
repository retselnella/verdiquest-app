import {View, Text, ActivityIndicator} from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Home from '../screens/Home';


const AppNav = () => {
    const {isLoading, userToken} = useContext(AuthContext);

    const navigation = useNavigation();

    if(isLoading) {
        <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size={'large'}/>
        </View>
    }
    return (
        <NavigationContainer>
            {userToken !== null ? navigation.navigate(<Home/>) : navigation.navigate(<AuthStack/>)}
        </NavigationContainer>
    );
}

export default AppNav;