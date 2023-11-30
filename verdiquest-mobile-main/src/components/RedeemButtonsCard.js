import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import DeleteButton from "./DeleteButton";
import RewardCard from "./RewardCard";
import PointCard from "./PointCard";  
import SearchBar from "./SearchBar";  
import axios from "axios";
import ipAddress from "../database/ipAddress";

const RedeemButtonsCard = ({ onCardPress, userPoint }) => {
    const [products, setProducts] = useState([]);
    const localhost = ipAddress;

    useEffect(() => {
        axios.get(`${localhost}/user/products`)
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const filterButtons = [
        { id: '1', title: 'All' },
        { id: '2', title: 'In Progress' },
        { id: '3', title: 'Redeem' },
    ];

    const renderFilterItem = ({ item }) => (
        <View style={styles.filterItemContainer}>
            <DeleteButton title={item.title} />
        </View>
    );

    const renderHeader = () => (
        <>
            <View style={styles.pointsContainer}>
                <PointCard points={userPoint} />
            </View>
            <SearchBar />
            <FlatList 
                data={filterButtons}
                renderItem={renderFilterItem}
                keyExtractor={item => item.id}
                horizontal={true}
                contentContainerStyle={styles.flatListContainer}
                showsHorizontalScrollIndicator={false}
            />
        </>
    );

    return (
        <FlatList 
            data={products}
            ListHeaderComponent={renderHeader}
            renderItem={({ item }) => (
                <View style={styles.rewardCardContainer}>
                    <RewardCard
                        productName={item.ProductName}
                        productDescription={item.ProductDescription}
                        requiredPoints={item.PointsRequired}
                        onPress={() => onCardPress(item)}
                    />
                </View>
            )}
            keyExtractor={(item, index) => item.ProductId ? item.ProductId.toString() : `product-${index}`}
        />

    );
};


const styles = StyleSheet.create({
    pointsContainer: {
        alignSelf: 'center', 
        width: '100%', 
        alignItems: 'center', 
        marginVertical: 20,
    },
    flatListContainer: {
        flexGrow: 1,
        gap: 15,
        marginTop: 20,
        paddingHorizontal: 5, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    rewardCardContainer: {
        flex: 1,
        width: '85%',
        justifyContent: 'center',
        marginLeft: 30,
    },
});


export default RedeemButtonsCard;