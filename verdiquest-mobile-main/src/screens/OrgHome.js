import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Dimensions } from "react-native";
import defaultImage from '../../assets/img/default-image.png';
import { theme } from "../../assets/style";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import DeleteButton from "../components/DeleteButton";
import CardTask from "../components/CardTask";
import CardEvent from "../components/CardEvent";
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
    const [events, setEvents] = useState([]);
    const [selected, setSelected] = useState('Tasks');

    const handleEventPress = (eventId) => {
        navigation.navigate('OrgView', { eventId: eventId });
    };
    
    const data = [
        {id: '1', title: 'Tasks'},
        {id: '2', title: 'Events'},
    ];

    const renderItem = ({item}) => {
        return (
            <DeleteButton title={item.title} onPress={() => setSelected(item.title)}/>
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

    const fetchOrganizationEvents = async () => {
        try {
            const response = await axios.get(`${localhost}/user/organization/events/${user.OrganizationId}`);
            if (response.data && response.data.success) {
                setEvents(response.data.events);
            } else {
                throw new Error('Failed to fetch events');
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        fetchOrganizationTasks();
        fetchOrganizationEvents();
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
                {selected === 'Tasks' ? 
                    tasks.map(task => (
                        <CardTask
                            key={task.TaskId}
                            title={task.TaskName}
                            eventDifficulty={task.TaskDifficulty} 
                            description={task.TaskDescription}
                            onPress={() => navigation.navigate('TaskDetails', { taskId: task.TaskId })}
                        />
                    )) : 
                    events.map(event => (
                        <CardEvent
                            key={event.EventId}
                            title={event.EventName}
                            venue={event.EventVenue}
                            description={event.EventDescription}
                            onPress={() => handleEventPress(event.EventId)}
                        />
                    ))
                }
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