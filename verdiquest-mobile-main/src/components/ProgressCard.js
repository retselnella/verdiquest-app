import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import * as Progress from 'react-native-progress';
import defaultImage from '../../assets/img/default-image.png';
import { theme } from "../../assets/style";

const ProgressCard = ({img, title, difficulty, progress = 0}) => {
    return (
        <View style={styles.container}>
            {img ? <Image defaultSource={defaultImage} source={img} style={styles.imageStyle}/> : <Image source={defaultImage} style={styles.imageStyle}/> }
            <View>
                <Text style={styles.titleStyle}>{title}</Text>
                <Text>{difficulty}</Text>
            </View>
            <Progress.Circle textStyle={{fontWeight: 'bold', fontSize: 10,}} showsText={true} strokeCap="round" progress={progress} color={theme.colors.primary}/>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        gap: 10,
        marginHorizontal: 20,
        marginBottom: 20,
    },
    imageStyle: {   
        width: '20%',
        height: 80,
        resizeMode: 'cover',
        alignSelf: 'flex-start',
        borderRadius: 15,
        padding: 10,
    },
    titleStyle: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});


export default ProgressCard;