import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from 'react-native';
import defaultImage from '../../assets/img/default-image.png';
import { theme } from "../../assets/style";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import ipAddress from "../database/ipAddress"; 

const PartnerOverview = ({ route }) => {
    const navigation = useNavigation();
    const { user, organization } = route.params; 
    const [organizationDetails, setOrganizationDetails] = useState({});
    const localhost = ipAddress;

    useEffect(() => {
        if (user && organization.OrganizationId) {
            fetchOrganizationDetails(organization.OrganizationId);
        } else {
            console.error('Organization ID not provided');
        }
    }, [user, organization]);

    const fetchOrganizationDetails = async (organization) => {
        try {
            const response = await axios.get(`${localhost}/user/organizationDetails/${organization}`);
            if (response.data && response.data.success) {
                setOrganizationDetails(response.data.organization);
            } else {
                throw new Error('Failed to fetch organization details');
            }
        } catch (error) {
            console.error('Error fetching organization details:', error);
        }
    };

    const handleJoinOrg = async () => {
        try {
            const response = await axios.post(`${localhost}/user/joinOrg`, {
                userId: user.UserId,  
                organizationId: organization.OrganizationId,
            });
        
            if (response.data && response.data.success) {
                const updatedUser = response.data.user; 
    
                navigation.navigate('SuccessJoin', { user: updatedUser });
            } else {
                console.error('Failed to join organization');
            }
        } catch (error) {
            console.error('Error joining organization:', error);
        }
    };
    

    return (
        <View style={styles.container}>
            <Image 
                source={organizationDetails.OrganizationImage ? { uri: organizationDetails.OrganizationImage } : defaultImage} 
                style={styles.imageStyle} 
            />
            <Text style={styles.headerStyle}>
                {organizationDetails.OrganizationName || 'Organization Name'}
            </Text>
            <View style={styles.visionMissionContainer}>
                <Text style={styles.titleStyle}>Address</Text>
                <Text style={styles.textStyle}>
                    {organizationDetails.OrganizationAddress || 'Lorem Ipsum'}
                </Text>
                <Text style={styles.titleStyle}>Organization Type</Text>
                <Text style={styles.textStyle}>
                    {organizationDetails.OrganizationType || 'Lorem Ipsum'}
                </Text>
            </View>
            <Button title={'BECOME A MEMBER'} onPress={handleJoinOrg} />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        gap: 20
    },
    imageStyle: {
        width: '50%',
        height: 150,
        resizeMode: 'center',
        borderRadius: 15,
    },
    visionMissionContainer: {
        width: '80%',
        backgroundColor: '#89A744',
        padding: 20,
        borderRadius: 10,
        marginHorizontal: 30,
        alignItems: 'center',
        marginBottom: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 5,
    },
    titleStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    textStyle: {
        color: 'white',
        marginBottom: 20,
    },
    headerStyle: {
        fontWeight: 'bold',
        fontSize: 24,
    }
});


export default PartnerOverview;