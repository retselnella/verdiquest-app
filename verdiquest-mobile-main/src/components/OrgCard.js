import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import defaultImage from '../../assets/img/default-image.png';


const OrgCard = ({img}) => {
    return(
        <View>
            {img ? <Image  /> : <Image  /> }
        </View>
    );
};


const styles = StyleSheet.create({

});

export default OrgCard;