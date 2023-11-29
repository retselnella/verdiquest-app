import React, {useState} from "react";
import {Text, StyleSheet, View, ScrollView} from 'react-native';
import { theme } from "../../assets/style";
import RegisterForm from "../components/RegisterForm";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";


const Register = () => {
    const logoGoogle = require('../../assets/img/google.png')

    const navigation = useNavigation();

    const [userData, setUserData] = useState({
        firstName: '',
        middleInitial: '',
        lastName: '',
        gender: '',
        birthday: '',
        phoneNumber: '',
        street: '',
        barangay: '',
        city: '',
        province: '',
        email: '',
        password: '',
      });

      const handleRegister = async () => {
        const user = new BaseModel(null);
        user.firstName = userData.firstName;
        user.middleInitial = userData.middleInitial;
        user.lastName = userData.lastName;
        user.gender = userData.gender;
        user.birthday = userData.birthday;
        user.phoneNumber = userData.phoneNumber;
        user.street = userData.street;
        user.barangay = userData.barangay;
        user.city = userData.city;
        user.province = userData.province;
        user.email = userData.email;
        user.password = userData.password;
    
        // Navigate to the next login screen again to login
        navigation.navigate("Login");

      };

    return (
        <ScrollView keyboardShouldPersistTaps='handled' style={{backgroundColor: theme.colors.background, flex: 1}}>
            <View style={styles.background}>
                <Button title="Signup with Google" img={logoGoogle}/>
                <View style={styles.dividerContainer}>
                    <View style={styles.divider}/>
                    <Text style={{top: 8}}>or</Text>
                    <View style={styles.divider}/>
                </View>
                <RegisterForm
                    userData={userData}
                    onRegister={handleRegister}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: theme.colors.background,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 100,
    },
    divider: {
        width: '30%',
        height: 1,
        backgroundColor: '#000000',
        margin: 20,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignContent: 'center',
    },
});

export default Register;