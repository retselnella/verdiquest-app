import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

const CardTask = ({ title, difficulty, img, description, onPress }) => {
    return (
        <View style={styles.cardContainer}>
            <Image source={{ uri: img }} style={styles.cardImage} />
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardDifficulty}>{difficulty}</Text>
                <Text style={styles.cardDescription} numberOfLines={2}>{description}</Text>
                <TouchableOpacity style={styles.viewButton} onPress={onPress}>
                    <Text style={styles.viewButtonText}>View</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#F7F2FA',
        borderRadius: 15,
        marginVertical: 10,
        marginHorizontal: 16, // Adjusted for slightly wider cards
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 5,
        overflow: 'hidden',
        width: '90%',
    },
    cardImage: {
        width: '100%',
        height: 150, // Adjust based on your image aspect ratio
    },
    cardContent: {
        padding: 16,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    cardDifficulty: {
        fontSize: 16,
        color: '#4CAF50', // Use appropriate color for the difficulty
        marginBottom: 8,
    },
    cardDescription: {
        fontSize: 14,
        color: '#646464',
        marginBottom: 16,
    },
    viewButton: {
        backgroundColor: '#3D691B', // Use your theme color
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewButtonText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});

export default CardTask;
