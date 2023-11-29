import React from "react";
import {View, StyleSheet, Text, Image} from 'react-native';
import { theme } from "../../assets/style";
import defaultImage from '../../assets/img/default-image.png';
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";

const SuccessJoin = ({img, route}) => {
    const navigation = useNavigation();

    const {user} = route.params;

    const handleProceed = () => {
        navigation.navigate('OrgHome', {user: user});
    };

    return (
        <View style={styles.container}>
            {img ? <Image  defaultSource={defaultImage} source={img} style={styles.imageStyle}/> : <Image source={defaultImage} style={styles.imageStyle}/>}
            <View style={{marginBottom: 40,}}>
                <Text style={styles.titleStyle}>Congratulations!</Text>
                <Text style={styles.textStyle}>You are now part of!</Text>
                <Text style={styles.textStyle}>Organization Name</Text>
            </View>
            <Button title={'PROCEED'} onPress={handleProceed}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        flex: 1,
        paddingHorizontal: 20,
        alignItems: 'center',
        paddingTop: 40,
        gap: 60,
    },
    imageStyle: {
        width: '70%',
        height: 180,
        resizeMode: 'center',
        borderRadius: 15,
    },
    titleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
    },
    textStyle: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default SuccessJoin;