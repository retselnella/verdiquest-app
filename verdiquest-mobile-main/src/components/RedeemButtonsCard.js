import React from "react";
import {View, StyleSheet, Text, FlatList} from 'react-native';
import DeleteButton from "./DeleteButton";
import RewardCard from "./RewardCard";

const RedeemButtonsCard = () => {
    const data = [
        {id: '1', title: 'All'},
        {id: '2', title: 'In Progress'},
        {id: '3', title: 'Redeem'},
    ];

    const renderItem = ({item}) => {
        return (
            <View>
                <DeleteButton title={item.title}
                />
            </View>
        );

        
    };
    return(
    <View style={styles.container}>
        <View>
            <FlatList 
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal={true}
                contentContainerStyle={styles.flatListContainer}
                showsHorizontalScrollIndicator={false}
            />
        </View>
        <View>
            <RewardCard />
        </View>
    </View>
    );
};


const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    flatListContainer: {
        gap: 5,
        justifyContent: 'center',
        alignContent: 'center',
    },
});


export default RedeemButtonsCard;