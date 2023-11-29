import React, {useState, useContext} from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, Alert} from "react-native";
import { theme } from "../../assets/style";
import Button from "../components/Button";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../navigation/AuthContext";


const Login = () => {
    const {login} = useContext(AuthContext);

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');


    const logoGoogle = require('../../assets/img/google.png')

    //Token
    // function generateAuthToken () {
    //     const randomString = Math.random().toString(36).substring(7);
    //     const timeStamp = Date.now();
    //     return `${randomString}-${timeStamp}`;
    // }
    // const authToken = generateAuthToken();

    // const storeAuthToken = async (authToken) => {
    //     try {
    //         await AsyncStorage.setItem(generateAuthToken(), authToken);
    //     }catch(error){
    //         console.log(error);
    //     }
    // };

    // const getAuthToken = async () => {
    //     try {
    //         const authToken = await AsyncStorage.getItem(authToken);
    //     } catch(error) {
    //         console.log(error);
    //     }
    // };

    // const authenticateUser = async () => {
    //     const authToken = await getAuthToken();
    //     if (authToken){
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // };

    // const handleLogin = () => {
    //     axios.post('http://192.168.1.6:3000/login', {
    //         email: email,
    //         password: password,    
    //     })
    //     .then(response => {
    //         Alert.alert('Success', "Welcome to VerdiQuest");
    //         navigation.navigate('Home');
    //     })
    //     .catch(error => {
    //         console.error('Error during login:', error.response ? error.response.data : error.message);
    //         Alert.alert('Error', 'Failed to Login. Please try again.');
    //     });
        
    // };

    //Navigate to Register Screen
    const navigation = useNavigation();

    const goToRegister = () => {
        navigation.navigate("Register");
    };

    return (
        <ScrollView keyboardShouldPersistTaps='handled' style={{backgroundColor: theme.colors.background, flex: 1}}>
            <View style={styles.background}>
                <Image source={require('../../assets/img/verdiquestlogo-ver2.png')} style={styles.img}/>
                <Button title="Login with Google" img={logoGoogle}/>
                <View style={styles.dividerContainer}>
                    <View style={styles.divider}/>
                    <Text style={{top: 8}}>or</Text>
                    <View style={styles.divider}/>
                </View>
                <Text style={{fontSize: 24, fontWeight: 'bold', color: theme.colors.primary, marginVertical: 20,}}>Volunteer Login</Text>
                {/* Username */}
                <View style={{ justifyContent: 'flex-start'}}>
                    <Text style={styles.textInput}>Email</Text>
                    <TextInput
                        style={styles.inputStyle}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                {/* Password */}
                <View style={{justifyContent: 'flex-start', marginBottom: 20,}}>
                    <Text style={styles.textInput}>Password</Text>
                    <TextInput
                        style={styles.inputStyle}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity style={{alignSelf: 'flex-end'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 12, marginRight: 20,}}>Forgot password?</Text>
                    </TouchableOpacity>
                </View>
                <Button title="LOGIN" onPress={() => login(email, password, navigation)}/>
                <TouchableOpacity onPress={goToRegister}>
                        <Text style={{fontWeight: 'bold', fontSize: 14, marginTop: 50}}>Create a new account</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: 'flex-start',
        alignItems: 'center',

    },
    img: {
        width: 180,
        height: 180,
        marginTop: 150,
        marginBottom: -20,
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
    inputStyle: {
        borderColor: '#44483E',
        borderWidth: 1,
        borderRadius: 12,
        width: 256,
        height: 45,
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

export default Login;