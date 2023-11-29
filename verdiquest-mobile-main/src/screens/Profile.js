import React, { useState } from "react";
import {Text, View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import { theme } from "../../assets/style";
import IntroCard from "components/IntroCard";
import OrganizationCard from "../components/OrganizationCard";
import AchievementCard from "../components/AchievementCard";
import Ionicons from 'react-native-vector-icons/Ionicons';


const Profile = () => {

    const screenHeight = Dimensions.get('window').height;
    const paddingBottom = screenHeight * 0.15;

    return (
        
        <ScrollView keyboardShouldPersistTaps='handled' style={{backgroundColor: theme.colors.background, flex: 1}} contentContainerStyle={{paddingBottom: paddingBottom}}>
            <View style={{flex: 1,}}>
                <View style={{position: 'absolute', top: 40, right: 20, zIndex: 1}}>
                    <Ionicons name="settings-outline" size={20} color="black" onPress={() => console.log('Settings Pressed')} />
                </View>
                <View style={{flex: 1, marginTop: 10}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 20, marginHorizontal: 20}}>
                        <View style={styles.profileContainer}></View>
                        <Text style={styles.nameLabel}>Ram Charles P. Dela Cruz</Text>
                        <Text style={styles.emailLabel}>ram.charles@gmail.com</Text>
                        <Text style={styles.roleLabel}>Volunteer</Text>
                    </View>
                </View>
                <View style={styles.introContainer}>
                    <IntroCard/>
                </View>
                <View style={styles.organizationContainer}>
                    <OrganizationCard/>
                </View>
                <View style={styles.achievementsContainer}>
                    <AchievementCard/>
                </View>
            </View>
        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    img: {
        height: 120,
        width: 120,
    },
    introContainer: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
        marginBottom: 10,
    },
    organizationContainer: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    achievementsContainer: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 10,
    },
    profileContainer: {
        height: 100,
        width: 100,
        borderRadius: 100/2,
        marginTop: 20,
        backgroundColor: theme.colors.primary,
    },
    nameLabel: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    emailLabel: {
        fontSize: 14,
        color: '#808080',
    },
    roleLabel: {
        fontSize: 14,
        marginTop: 5,
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
});

export default Profile;