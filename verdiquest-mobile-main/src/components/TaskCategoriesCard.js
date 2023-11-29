import React from "react";
import {View, StyleSheet, Text, Image} from 'react-native';
import defaultImage from '../../assets/img/default-image.png';
import { TouchableOpacity } from "react-native-gesture-handler";




const TaskCategoriesCard = ({img = defaultImage, title, onPress}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <View style={{flex: 1, flexDirection:'column', alignItems: 'center'}}>
                    {img ? <Image defaultSource={defaultImage} source={img} style={styles.imageStyle}/> : <Image source={defaultImage} style={styles.imageStyle}/>}
                    {title ? <Text style={styles.textStyle}>{title}</Text> : <Text style={styles.textStyle}>N/A</Text>}
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#89A744',
        width: '45%',
        marginBottom: 15, 
        padding: 20,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 5,
    },
    textStyle: {
        color: '#F1F1EA',
        marginTop: 10,
        fontSize: 18,
    },
    imageStyle: {
        width: '100%',
        height: 100,  
        resizeMode: 'center',
        borderRadius: 10, 
    },
});


export default TaskCategoriesCard;