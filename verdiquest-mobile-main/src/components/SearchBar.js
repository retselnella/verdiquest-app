import React, {useState} from "react";
import {View, StyleSheet, Text, TextInput} from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";

const SearchBar = () => {

    const [text, setText] = useState('');
    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <TextInput 
                onChangeText={setText} 
                value={text}
                placeholder="Search"
                style={styles.inputStyle}
                />
                <MaterialIcons name='search' size={16} style={styles.iconContainer}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E9E8E1',
        marginHorizontal: 30,
        borderRadius: 30,
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 5,
    },
    inputStyle: {
        color: '#44483E',
        padding: 5,
        margin: 5,
        width: '90%',
    },
    iconContainer: {
        alignSelf: 'center',

    },
});

export default SearchBar;