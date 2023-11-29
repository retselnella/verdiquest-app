import React from "react";
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import defaultImage from '../../assets/img/default-image.png';
import * as Progress from 'react-native-progress';
import { theme } from "../../assets/style";


const RewardCard = ({img, requredPoints, progress = 0.80}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center',}}>
                {img ? <Image defaultSource={defaultImage} source={img} style={styles.imageStyle}/> : <Image source={defaultImage} style={styles.imageStyle}/>}
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', gap: 40, backgroundColor: '#D9D9D9'}}>
                    <Text>Hope Fund</Text>
                    <View>
                        <Text>Redeem for {requredPoints} VP</Text>
                        <Progress.Bar progress={progress} color={theme.colors.primary} height={4}/>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#D9D9D9',
        padding: 20,
        marginVertical: 20,
        margin: 10,
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
    imageStyle: {
        width: '40%',
        height: 100,
        resizeMode: 'cover',
        borderRadius: 15,
    },
});

export default RewardCard;