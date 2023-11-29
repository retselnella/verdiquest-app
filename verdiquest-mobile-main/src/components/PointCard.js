import React from "react";
import {View, StyleSheet, Text} from 'react-native';
import { theme } from "../../assets/style";



const PointCard = ({points = 0}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.verdiPointsLabel}> {points} VP</Text>
            <Text style={styles.availablePointsLabel}>Available Points</Text>
            <Text style={styles.dateLabel}>October 29, 2023</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        height: 120,
        width: 200,
        backgroundColor: theme.colors.pointCardBackground,
        borderRadius: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 5,
    },
    verdiPointsLabel: {
        fontSize: 32,
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    availablePointsLabel: {
        fontSize: 16,
    },
    dateLabel: {
        fontWeight: 'bold',
    }
});


export default PointCard;