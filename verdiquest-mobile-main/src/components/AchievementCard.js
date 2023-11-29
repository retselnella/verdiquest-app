import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { theme } from "../../assets/style";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // or your preferred icon set

const achievementsData = [
    { key: '1', label: 'Recycler', description: 'He/she has recycled 100 items.' },
    { key: '2', label: 'Conservationist', description: 'Volunteer for an environmental organization.' },
    { key: '3', label: 'Composter', description: 'Compost 100 pounds of food waste.' },
];

const AchievementCard = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.introLabel}>Achievements:</Text>
                <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.divider} />
            <FlatList
                data={achievementsData}
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <View style={styles.achievementItem}>
                        <Icon name="trophy-award" size={24} color={theme.colors.primary} />
                        <View style={styles.achievementText}>
                            <Text style={styles.achievementLabel}>{item.label}</Text>
                            <Text style={styles.achievementDescription}>{item.description}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        width: 350,
        backgroundColor: '#DAE7C9',
        borderRadius: 15,
        padding: 20,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 5,
    },
    header: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 10,
    },
    introLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    editButton: {
        // Add styles for EDIT button
    },
    editButtonText: {
        fontSize: 14,
        color: theme.colors.primary,
    },
    divider: {
        width: "100%",
        height: 0.75,
        backgroundColor: "#000000",
        marginBottom: 10,
    },
    achievementItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    achievementText: {
        marginLeft: 10,
    },
    achievementLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    achievementDescription: {
        fontSize: 12,
        color: theme.colors.primary,
    }
});

export default AchievementCard;
