import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Button from "./Button";
import DeleteButton from "./DeleteButton";

const Card = ({ title, difficulty, img, description, onPress }) => {
    return (
        <View style={styles.container}>
            <Image source={img} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.difficulty}>{difficulty}</Text>
            <Text style={styles.description}>{description}</Text>
            <View style={styles.buttonContainer}>
                <Button title="View" onPress={onPress}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F2FA',
        borderRadius: 15,
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 5,
    },
    image: {
        width: '100%',
        height: 80, 
        borderRadius: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    difficulty: {
        fontSize: 18,
        fontWeight: '600',
        color: 'green', 
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#333',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default Card;
