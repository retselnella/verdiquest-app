import React, {useState} from "react";
import {View, Text, StyleSheet} from 'react-native';
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from "../../assets/style";

const Birthday = ({onValueChange}) => {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const [date,setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
        onValueChange && onValueChange(currentDate);  
    };
    
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    
    const showDatePicker = () => {
        showMode('date');
    };
    

    return (
        <View style={{flex: 1, marginHorizontal: 20, alignSelf: 'stretch'}}>
            <Text style={styles.textInput}>Birthdate</Text>
            <View style={{flexDirection: 'row'}}>
                <TextInput 
                    style={styles.inputStyle}
                    value={date.toLocaleDateString()}
                    onChangeText={handleChange}
                    editable={false}
                />
                {show && (
                    <DateTimePicker
                    value={date}
                    mode={mode}
                    onChange={onChange}
                />
                )}
                <TouchableOpacity onPress={showDatePicker}>
                    <MaterialCommunityIcons name="calendar" size={28}  color={`${theme.colors.primary}`}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputStyle: {
        flex: 2,
        borderColor: '#44483E',
        borderWidth: 1,
        borderRadius: 12,
        marginTop: -15,
        margin: 10,
        padding: 10,
    },
    textInput: {
        marginLeft: 20, 
        backgroundColor: theme.colors.background, 
        alignSelf: 'flex-start',
        fontSize: 16,
        color: '#44483E',
        zIndex: 1,
        padding: 5,
    },
});

export default Birthday;