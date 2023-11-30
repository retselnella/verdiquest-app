import React, { useState, useEffect } from "react";
import { View, StyleSheet } from 'react-native';
import PointCard from "../components/PointCard";
import { theme } from "../../assets/style";
import SearchBar from "../components/SearchBar";
import RedeemButtonsCard from "../components/RedeemButtonsCard";
import ipAddress from "../database/ipAddress";
import { useIsFocused, useNavigation } from '@react-navigation/native';
import axios from "axios";

const Redeem = ({ route }) => {
    const localhost = ipAddress;
    const { user } = route.params;
    const [userPoint, setUserPoints] = useState(0);
    const isFocused = useIsFocused();
    const navigation = useNavigation();

    useEffect(() => {
        if (isFocused && user && user.UserId) {
            fetchVerdiPoints();
        }
    }, [isFocused, user]);

    const fetchVerdiPoints = async () => {
        try {
            const response = await axios.get(`${localhost}/user/fetchVerdiPoints/${user.UserId}`);
            if (response.data.success) {
                setUserPoints(response.data.verdiPoints);
            } else {
                console.log("Failed to fetch VerdiPoints");
            }
        } catch (error) {
            console.error("Error fetching VerdiPoints:", error);
        }
    };

    const formatPoints = (points) => {
        return points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleCardPress = (product) => {
        navigation.navigate('ProductDetails', { product });
    };

    return (
        <View style={styles.container}>
            <RedeemButtonsCard onCardPress={handleCardPress} userPoint={formatPoints(userPoint)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'center',
    },
});

export default Redeem;
