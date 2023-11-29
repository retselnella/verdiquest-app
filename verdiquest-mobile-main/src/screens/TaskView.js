import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Image, Text } from "react-native";
import { theme } from "../../../assets/style";
import Button from "../../components/Button";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from 'expo-image-picker';

const TaskView = () => {
    const [imageUri, setImageUri] = useState(null);
    const [taskName, setTaskName] = useState('');
    const [taskType, setTaskType] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDuration, setTaskDuration] = useState('');
    const [taskPoints, setTaskPoints] = useState('');

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert('Permission Required', 'You need to allow access to your photos to upload an image.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,

        });

        if (!result.canceled && result.assets) {
            setImageUri(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.background}>
            <View style={styles.eventDetailsContainer}>
                <TouchableOpacity onPress={pickImage} style={styles.imagePlaceholder}>
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.img} />
                    ) : (
                        <Text style={styles.imagePlaceholderText}>Select Image</Text>
                    )}
                </TouchableOpacity>
                {/* Task Name */}
                <View style={{ justifyContent: 'flex-start' }}>
                    <Text style={styles.textInput}>Task Name</Text>
                    <TextInput
                        style={styles.inputStyle}
                        value={taskName}
                        onChangeText={setTaskName}
                        placeholder="Enter task name"
                    />
                </View>
                {/* Task Type */}
                <View style={{ justifyContent: 'flex-start' }}>
                    <Text style={styles.textInput}>Task Type</Text>
                    <TextInput
                        style={styles.inputStyle}
                        value={taskType}
                        onChangeText={setTaskType}
                        placeholder="Enter task type"
                    />
                </View>
                {/* Task Description */}
                <View style={{ justifyContent: 'flex-start' }}>
                    <Text style={styles.textInput}>Task Description</Text>
                    <TextInput
                        style={styles.modifiedDescriptioninputStyle}
                        value={taskDescription}
                        onChangeText={setTaskDescription}
                        placeholder="Enter task description"
                    />
                </View>
                <View style={styles.row}>
                    {/* Task Duration */}
                    <View style={styles.column}>
                        <Text style={styles.modifiedTextInput}>Task Duration</Text>
                        <TextInput
                            style={styles.modifiedInputStyle}
                            value={taskDuration}
                            onChangeText={setTaskDuration}
                            placeholder="Task Duration"
                        />
                    </View>
                    {/* Task Points */}
                    <View style={styles.column}>
                        <Text style={styles.modifiedTextInput}>Points Reward</Text>
                        <TextInput
                            style={styles.modifiedInputStyle}
                            value={taskPoints}
                            onChangeText={setTaskPoints}
                            placeholder="Points Reward"
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <MaterialIcon name="check"  size={18} />
                        <Text style={styles.View}>View Submission</Text>
                    </View>
                    <Button title="Edit" />
                </View>
            </View>
        </View>
    );

};
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    eventDetailsContainer: {
        backgroundColor: 'rgba(123, 144, 75, 0.25);',
        padding: 30,
        width: '90%',
        alignItems: 'center',
        borderRadius: 10,
    },
    img: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginTop: 15,
        marginBottom: 15,
    },
    imagePlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: '#44483E',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e1e1e1',
        marginTop: 15,
        marginBottom: 15,
    },
    imagePlaceholderText: {
        textAlign: 'center',
        color: '#999',
    },

    inputStyle: {
        borderColor: '#44483E',
        borderWidth: 1,
        borderRadius: 12,
        width: 280,
        height: 45,
        marginTop: -15,
        margin: 10,
        padding: 10,
    },
    modifiedDescriptioninputStyle: {
        borderColor: '#44483E',
        borderWidth: 1,
        borderRadius: 12,
        width: 280,
        height: 100,
        marginTop: -15,
        margin: 5,
        padding: 10,
    },
    modifiedInputStyle: {
        borderColor: '#44483E',
        borderWidth: 1,
        borderRadius: 12,
        width: 140,
        height: 45,
        marginTop: -15,
        margin: 5,
        padding: 10,
    },
    textInput: {
        marginLeft: 20,
        backgroundColor: theme.colors.background,
        alignSelf: 'flex-start',
        fontSize: 14,
        color: '#44483E',
        zIndex: 1,
        padding: 5,
    },

    modifiedTextInput: {
        marginLeft: 10,
        backgroundColor: theme.colors.background,
        alignSelf: 'flex-start',
        fontSize: 14,
        color: '#44483E',
        zIndex: 1,
        padding: 5,
    },

    row: {
        flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    },
    column: {
        flex: 1,
        alignItems: 'center',
        padding: 5,
    },
});

export default TaskView;