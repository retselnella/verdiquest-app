import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import Button from "../components/Button";

const localImage = require('../../assets/img/verdiquestlogo-ver2.png');

const ProductReceipt = () => {
    return (
        <View style={styles.background}>
            <View style={styles.eventDetailsContainer}>
                <Image source={localImage} style={styles.cardImage} />
                <Text style={styles.tokenText}>VerdiQuest Token</Text>
                <View style={styles.receiptContainer}>
                    <Text style={styles.receiptText}>Dear, [Customer Name]</Text>
                    </View>
                    <View style={styles.container}>
                    <Text style={styles.receiptText}>Redemption Date: [Date]</Text>
                    <Text style={styles.receiptText}>Customer ID: [ID]</Text>
                    <Text style={styles.receiptText}>Verdi Points Used: [Points Used]</Text>
                    <Text style={styles.receiptText}>Remaining Points: [Remaining Points]</Text>
                    <Text style={styles.receiptText}>Item Name: [Item Name]</Text>
                    <Text style={styles.receiptText}>Item Code: [Item Code]</Text>
                    <Text style={styles.receiptText}>Quantity: [Quantity]</Text>
                    <Text style={styles.receiptText}>Value: [Value]</Text>
                    <Text style={styles.receiptText}>Address: [Address]</Text>
                </View>
            </View>
            <View style={{ marginTop: 20 }}>
                <Button title="Done" />
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    eventDetailsContainer: {
        backgroundColor: "rgba(123, 144, 75, 0.25)",
        padding: 30,
        width: "100%",
        alignItems: "center",
        borderRadius: 10,
    },
    cardImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 15,
    },
    tokenText: {
        fontSize: 11,
        fontWeight: 'bold',
        marginTop: -40,
    },
    receiptContainer: {
        alignSelf: 'stretch',
        alignItems: 'flex-start',
        marginTop: 50,
    },
    receiptText: {
        fontSize: 16,
        fontWeight: 'normal',
        marginVertical: 4,
    },
    container: {
        alignSelf: 'stretch',
        alignItems: 'flex-start',
        marginTop: 30,
    },
});

export default ProductReceipt;
