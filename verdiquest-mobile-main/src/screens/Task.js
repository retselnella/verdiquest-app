import React from "react";
import {View, StyleSheet, Text, ScrollView, Dimensions} from 'react-native';
import Button from '../components/Button';
import { theme } from "../../assets/style";
import TaskCategoriesCard from '../components/TaskCategoriesCard';
import { useNavigation } from "@react-navigation/native";



const Task = ({route}) => {
    const {user} = route.params;

    const screenHeight = Dimensions.get('window').height;
    const paddingBottom = screenHeight * 0.15;

    const navigation = useNavigation();

    const handleEnvironmentProtection = () => {
        navigation.navigate('TaskList', { user: user , title:`Environmental Protection`});
    };


    return(
        <ScrollView keyboardShouldPersistTaps='handled' style={{backgroundColor: theme.colors.background, flex: 1}} 
        contentContainerStyle={{paddingBottom: paddingBottom}}>
            <View style={{flex: 1, marginVertical: 10, marginHorizontal: 20, gap: 10,}}>
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center',}}>
                    <View style={{alignSelf: 'flex-start',}}>
                        <Button title="Back" color="#F4F4ED" icon='arrow-back' textColor='#3D691B'/>
                    </View>
                    <Text style={styles.titleStyle}>Task</Text>         
                    <Text style={styles.titleStyle}>Categories</Text>         
                </View>
                <View style={{flex: 1, alignSelf: 'flex-end'}}>
                    <Button title='Events' color='#F4F4ED' icon='star' textColor='#3D691B'/>
                </View>
                {/* Card */}
                <View style={styles.cardContainer}>
                    <TaskCategoriesCard onPress={handleEnvironmentProtection} title='Environmental Protection'/>
                    <TaskCategoriesCard title='Renewable Energy'/>
                    <TaskCategoriesCard title='Sustainable Energy'/>
                    <TaskCategoriesCard title='Waste Reduction'/>
                    <TaskCategoriesCard title='Transportation'/>
                    <TaskCategoriesCard title='Conservation'/>
                </View>
            </View> 
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 36    ,
        color: theme.colors.primary,
    },
    cardContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});

export default Task;