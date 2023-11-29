import React from "react";
import {StyleSheet, View, Text, Image} from 'react-native';
import { theme } from "../../assets/style";
import defaultImage from '../../assets/img/default-image.png';
import Button from "../components/Button";

const OrgView = ({img}) => {
    return (
        <View style={styles.container}>
            { img ?  
            <Image defaultSource={defaultImage} source={img} style={styles.imageStyle}/> 
            : <Image source={defaultImage} style={styles.imageStyle}/>
            }
            <Text style={styles.titleStyle}>Environmental Cleaning</Text>
            <View style={styles.detailsContainer}>
                <Text style={styles.textStyle}>Details</Text>
                <Text>Join us for a Beach Cleanup on June 24th</Text>
                <Text>Location: Larawan Beach, Talisay</Text>
                <Text>Meeting Venue: SM Seaside</Text>
                <Text>Transport Vehicle: Bus</Text>
                <Text>Points to Earn: 500 VerdiPoints</Text>
            </View>
            <View style={{alignItems: 'center', gap: 10}}>
                <Text>Time Completion: 5 hrs</Text>
                <Text>19/30</Text>
                <Button title={'Apply'}/>
            </View>
        </View>//div
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 20,
        alignItems: 'center',
        gap: 20,
    },
    imageStyle: {
        borderRadius: 15,
        width: '90%',
        height: 250,
        resizeMode: 'center',
    },
    detailsContainer: {
        backgroundColor: '#D9D9D9',
        width: '90%',
        padding: 20,
        borderRadius: 15,
    },
    textStyle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    titleStyle: {
        fontSize: 26,
        fontWeight: 'bold',
    },
});

export default OrgView;
