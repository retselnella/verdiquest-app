import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import defaultImage from '../../assets/img/default-image.png';
import { theme } from "../../assets/style";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import DeleteButton from "../components/DeleteButton";
import CardTask from "../components/CardTask";
import axios from "axios";
import ipAddress from "../database/ipAddress";
import { useNavigation } from "@react-navigation/native";

const OrgHome = ({route}) => {
    const localhost = ipAddress;

    const screenHeight = Dimensions.get('window').height;
    const paddingBottom = screenHeight * 0.15;

    const {user} = route.params;
    const navigation = useNavigation();
    const [tasks, setTasks] = useState([]);

    const handleOrgView = (task) => {
        // Implement the logic for handling task view. For now, it just navigates to OrgView.
        navigation.navigate('OrgView', { user: user, task: task });
    };

    const data = [
        {id: '1', title: 'Tasks'},
        {id: '2', title: 'Events'},
    ];

    const renderItem = ({item}) => {
        return (
            <View>
                <DeleteButton title={item.title}
                />
            </View>
        );
    };

    const fetchOrganizationTasks = async () => {
        try {
            const response = await axios.get(`${localhost}/user/tasks/${user.OrganizationId}`);
            if (response.data && response.data.success) {
                setTasks(response.data.tasks);
            } else {
                throw new Error('Failed to fetch tasks');
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchOrganizationTasks();
    }, [user.OrganizationId]);

    return (
        <ScrollView keyboardShouldPersistTaps='handled' style={{backgroundColor: theme.colors.background, flex: 1,}} contentContainerStyle
        ={{paddingBottom: paddingBottom}} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
            <Image
                    source={user.ProfilePicture ? { uri: user.ProfilePicture } : defaultImage}
                    style={styles.imageStyle}
                />
                <View style={{alignSelf: 'center', flex: 1,}}>
                    <FlatList 
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        horizontal={true}
                        contentContainerStyle={styles.flatListContainer}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                {tasks.map(task => (
                    <CardTask
                        key={task.TaskId}
                        title={task.TaskName}
                        eventName={task.TaskDifficulty} 
                        description={task.TaskDescription}
                        onPress={() => handleOrgView(task)}
                    />
                ))}
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        marginHorizontal: 30,
    },
    imageStyle: {
        width: '90%',
        height: 150,
        resizeMode: 'center',
        borderRadius: 10,
        alignSelf: 'center',
    },
    flatListContainer: {
        marginTop: 20,
        gap: 30,
        justifyContent: 'center',
        alignContent: 'center',
    },
});


export default OrgHome;