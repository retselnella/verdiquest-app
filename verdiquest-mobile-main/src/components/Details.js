import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { theme } from "../../assets/style";
import { MaterialIcons } from "@expo/vector-icons";

const Details = ({ timeCompleted, taskDescription = 'No description available.', rewardPoints = 0 }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerStyle}>Environmental Cleaning</Text>
            <View style={styles.timeContainer}>
                <MaterialIcons name='access-time' size={20} color={theme.colors.primary}/>
                <Text style={styles.textStyle}>Time Completion: {timeCompleted}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.titleStyle}>Details</Text>
                <Text style={styles.descriptionStyle}>{taskDescription}</Text>
            </View>
            <Text style={styles.rewardTextStyle}>Reward: {rewardPoints} <Text style={styles.rewardValueStyle}>VP</Text></Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 5,
        backgroundColor: '#FFFFFF', // Changed to white to match your card
        padding: 20,
        margin: 20,
        borderRadius: 20,
    },
    headerStyle: {
        fontWeight: 'bold',
        fontSize: 24, // Adjusted font size
        marginBottom: 10, // Added spacing
        textAlign: 'center', // Centered text
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10, // Added spacing
    },
    textStyle: {
        marginLeft: 5, // Added space between icon and text
        fontWeight: 'bold',
        color: '#3D691B', // Adjusted text color
    },
    detailsContainer: {
        marginBottom: 10, // Added spacing
    },
    titleStyle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5, // Added spacing
    },
    descriptionStyle: {
        fontSize: 16, // Adjusted font size
    },
    rewardTextStyle: {
        fontWeight: 'bold',
        alignSelf: 'flex-end', // Align to the right
        fontSize: 18, // Adjusted font size
    },
    rewardValueStyle: {
        color: theme.colors.primary, // Adjusted color to match your theme
    },
});

export default Details;
