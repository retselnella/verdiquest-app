import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { theme } from '../../assets/style';
import TaskCategoriesCard from '../components/TaskCategoriesCard';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; 
import ipAddress from "../database/ipAddress";

const Partners = ({ route }) => {
    const { user } = route.params;
    const [organizations, setOrganizations] = useState([]);
    const navigation = useNavigation();
    const localhost = ipAddress;

    useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                const response = await axios.get(`${localhost}/user/organizations`);
                if (response.data && response.data.success) {
                    setOrganizations(response.data.organizations);
                } else {
                    throw new Error('Failed to fetch organizations');
                }
            } catch (error) {
                console.error('Error fetching organizations:', error);
            }
        };
        fetchOrganizations();
    }, []);

    const handleOrganizationView = async (organization) => {
        try {
            const response = await axios.get(`${localhost}/user/isMember`, {
                params: {
                    userId: user.UserId, 
                    organizationId: organization.OrganizationId
                }
            });
            
            if (response.data && response.data.isMember) {
                navigation.navigate('OrgHome', { user: user, organization: organization });
            } else {
                navigation.navigate('PartnerOverview', { user: user, organization: organization });
            }
        } catch (error) {
            console.error('Error checking membership:', error);
        }
    };
    

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.titleStyle}>Organization Partners</Text>
                <View style={styles.cardContainer}>
                    {organizations.map((organization) => (
                        <TaskCategoriesCard
                            key={organization.OrganizationId}
                            title={organization.OrganizationName}
                            onPress={() => handleOrganizationView(organization)}
                        />
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    titleStyle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: theme.colors.primary,
        textAlign: 'center',
        marginTop: 20,
    },
    cardContainer: {
        marginTop: 30,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});

export default Partners;