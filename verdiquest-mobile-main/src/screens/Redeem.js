import React from "react";
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import PointCard from "../components/PointCard";
import { theme } from "../../assets/style";
import SearchBar from "../components/SearchBar";
import RedeemButtonsCard from "../components/RedeemButtonsCard";

const Redeem = () => {
    return(
        <View style={styles.container}>
            <View style={styles.pointsContainer}>
                <PointCard />
            </View>
            <SearchBar />
        <ScrollView>
            <RedeemButtonsCard  />
        </ScrollView>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'center',
    },
    pointsContainer: {
        flexDirection: 'row',
        margin: 30,
        borderRadius: 15,
    },
    
});

export default Redeem;