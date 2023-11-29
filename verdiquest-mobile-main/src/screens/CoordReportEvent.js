import React from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { theme } from "../../../assets/style";
import CoordEventCard from "../../components/CoordReportCard";
import { useNavigation } from "@react-navigation/native";

const CoordReportEvent = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textStyle}>REPORT</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Mission</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonStyle, styles.buttonActive]}>
                    <Text style={styles.buttonTextActive}>Event</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollView}>
                <CoordEventCard
                    participants={8}
                    done={2}
                    title="Cleanup Drive"
                    description={"well-being"}
                />
                <CoordEventCard
                    participants={20}
                    done={30}
                    title="Tree Planting"
                    description={"Recycling"}
                />
                <CoordEventCard
                    participants={100}
                    done={82}
                    title="Collect Plastic Bottle and Scrap Metals"
                    description={"Recycling"}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 50,
        backgroundColor: theme.colors.background,
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
    },
    textStyle: {
        fontSize: 16,
        paddingVertical: 10,
        fontWeight: "bold",
        textAlign: "center",
    },
    scrollView: {
        width: "90%", // Ensures ScrollView takes full width
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20, // Space from the bottom
    },
    buttonStyle: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 5,
        borderRadius: 5,
        backgroundColor: '#4CAF50', // Change as per your inactive button color
    },
    buttonActive: {
        backgroundColor: '#3F4A34', // Change as per your active button color
    },
    buttonText: {
        color: '#000000', // Change as per your inactive text color
        textAlign: 'center',
    },
    buttonTextActive: {
        color: '#FFFFFF', // Change as per your active text color
        textAlign: 'center',
    },
    container: {
        flex: 1,
        paddingVertical: 50,
        backgroundColor: theme.colors.background,
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
    },
    textStyle: {
        fontSize: 16,
        paddingVertical: 10,
        fontWeight: "bold",
        textAlign: "center",
    },
    header: {
        flexDirection: "row",
        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    scrollView: {
        width: "90%", // Ensures ScrollView takes full width
    },
});

export default CoordReportEvent;
