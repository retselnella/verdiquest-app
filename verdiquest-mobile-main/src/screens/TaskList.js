import React from "react";
import {View, StyleSheet, } from 'react-native';
import TaskListHeader from "../components/TaskListHeader";
import { theme } from "../../assets/style";
import { ScrollView } from "react-native-gesture-handler";
import Card from '../components/Card';


const TaskList = ({route}) => {
    const {user, title} = route.params;

    return(
        <ScrollView style={styles.background}>
            <View style={{flex: 1}}>
                <TaskListHeader title={title} route={route.params}/>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: theme.colors.background,
    },
});

export default TaskList;