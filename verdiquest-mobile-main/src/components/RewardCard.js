import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import defaultImage from '../../assets/img/default-image.png';
import * as Progress from 'react-native-progress';
import { theme } from "../../assets/style";

const RewardCard = ({ img, productName, productDescription, requiredPoints, progress = 0.80 }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', }}>
                {img ? <Image defaultSource={defaultImage} source={img} style={styles.imageStyle} /> : <Image source={defaultImage} style={styles.imageStyle} />}
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 5, backgroundColor: '#D9D9D9' }}>
                    <Text style={styles.productNameLabel}>{productName}</Text>
                    <Text style={styles.productDescription} numberOfLines={2} ellipsizeMode='tail'>
                        {productDescription}
                    </Text>
                    <Text>Redeem for {requiredPoints} VP</Text>
                    <Progress.Bar progress={progress} color={theme.colors.primary} height={4} />
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
    productNameLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    productDescription: {
        fontSize: 12,
        color: 'black',
        margin: 5,
        marginBottom: 5,
        textAlign: 'center',
    },
});

export default RewardCard;