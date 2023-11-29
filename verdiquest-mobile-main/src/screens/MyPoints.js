import React, { useState, useEffect } from "react";
import {View, StyleSheet, Text} from 'react-native';
import PointCard from '../components/PointCard';
import { theme } from "../../assets/style";
import OngoingTask from "../components/OngoingTask";
import { ScrollView } from "react-native-gesture-handler";
import ipAddress from "../database/ipAddress";
import { useIsFocused } from '@react-navigation/native';
import axios from "axios";


const MyPoints = ({ route}) => {
    const { user } = route.params;
    const [tasks, setTasks] = useState([]);
    const [userPoint, setUserPoints] = useState(0);
    const isFocused = useIsFocused();
    const localhost = ipAddress;
    useEffect(() => {
        if (isFocused && user && user.UserId) {
            fetchTasksAccepted();
            fetchAvailablePoints();
        }
    }, [isFocused, user]);

    const fetchTasksAccepted = async () => {
        try {
            const response = await axios.get(`${localhost}/user/fetchAcceptedTasks/${user.UserId}`);
            if (response.data.success) {
            const tasksWithUniqueKeys = response.data.acceptedTasks.map((task) => ({
                ...task,
                key: `task-${task.TaskId}-${Math.random().toString(16).slice(2)}`,
            }));
                setTasks(tasksWithUniqueKeys);
            } else {
                console.log("Failed to fetch accepted tasks");
            }
            } catch (error) {
            console.error("Error fetching accepted tasks:", error);
            }
        };

    const fetchAvailablePoints = async () => {
            try {
                const response = await axios.get(`${localhost}/user/fetchVerdiPoints/${user.UserId}`);
                if (response.data.success) {
                    setUserPoints(response.data.verdiPoints);
                } else {
                    console.log("Failed to fetch VerdiPoints");
                }
            } catch (error) {
                console.error("Error fetching VerdiPoints:", error);
            }
    };
        
    const formatPoints = (points) => {
        return points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return(
        <View style={styles.container}>
            <View style={styles.pointsContainer}>
                <PointCard points={formatPoints(userPoint)}  />
            </View>
            <ScrollView>
                <OngoingTask tasks={tasks}/>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        flexDirection: 'column',
    },
    pointsContainer: {
        flexDirection: 'row',
        margin: 30,
        borderRadius: 15,
    },

});

export default MyPoints;