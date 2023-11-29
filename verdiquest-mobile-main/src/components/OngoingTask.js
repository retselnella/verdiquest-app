import React from "react";
import {View, StyleSheet, Text} from 'react-native';
import { theme } from "../../assets/style";
import ProgressCard from "./ProgressCard";


const OngoingTask = ({ tasks }) => {
    const getDifficultyLevel = (difficultyId) => {
        const difficultyString = String(difficultyId);
        switch (difficultyString) {
            case "0":
                return "All";
            case "1":
                return "Easy";
            case "2":
                return "Normal";
            case "3":
                return "Hard";
            default:
                return "Unknown";
            }
    };

    const calculateTotalPoints = () => {
        const totalPoints = tasks && tasks.length > 0
            ? tasks.reduce((acc, task) => acc + (task.TaskPoints || 0), 0)
            : 0;
        return totalPoints.toLocaleString(); 
    };

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20 }}>
                <View>
                    <Text style={styles.textStyle}>Ongoing</Text>
                    <Text style={styles.textStyle}>Task</Text>
                </View>
                <View>
                    <Text style={styles.textStyle}>Possible Points to </Text>
                    <Text style={styles.textStyle}>be earned: {calculateTotalPoints()} </Text>
                </View>
            </View>
            <View>
                {tasks && tasks.length > 0 ? (
                    tasks.map((task) => (
                        <ProgressCard
                            key={task.key}
                            img={task.img} 
                            title={task.TaskName || "No Title"}
                            difficulty={getDifficultyLevel(task.DifficultyId) || "No Difficulty"}
                            progress={task.progress}
                        />
                    ))
                ) : (
                    <Text style={styles.noTasksText}>No ongoing tasks</Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.primary,
        borderRadius: 15,
        marginHorizontal: 30,
        marginBottom: 30,

    },
    textStyle: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    noTasksText: {
        textAlign: 'center',
        color: '#666',
        marginTop: 20,
    },
});

export default OngoingTask;