import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import Button from "../components/Button";


const localImage = require('../../assets/img/verdiquestlogo-ver2.png');

const ProductRedeem = () => {
  const [productSize, setProductSize] = useState("20 x 40 x 69");
  const [contactNumber, setContactNumber] = useState("09226619084");
  const [deliveryAddress, setDeliveryAddress] = useState("Rizal, Langtad, Talisay, Cebu");

  return (
    <View style={styles.background}>
      <Image source={localImage} style={styles.cardImage} />
      <Text style={styles.tokenText}>VerdiQuest Token</Text>
      <View style={styles.eventDetailsContainer}>
      <Text style={styles.headerText}>Delivery Details</Text>
        <Text style={styles.label}>Product Size</Text>
        <TextInput
          style={styles.inputStyle}
          value={productSize}
          onChangeText={setProductSize}
          placeholder="Enter size"
        />

        <Text style={styles.label}>Contact Number</Text>
        <TextInput
          style={styles.inputStyle}
          value={contactNumber}
          onChangeText={setContactNumber}
          placeholder="Enter contact number"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Delivery Address</Text>
        <TextInput
          style={styles.inputStyle}
          value={deliveryAddress}
          onChangeText={setDeliveryAddress}
          placeholder="Enter delivery address"
        />
        <Button title="Confirm" />
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
    backgroundColor: '#f5f5f5', // Assuming you have a theme colors defined
  },
  eventDetailsContainer: {
    backgroundColor: "rgba(123, 144, 75, 0.25);",
    padding: 30,
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 50,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 2,
    alignSelf: "center",
  },
  cardImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  tokenText: { // New style for the token label
    fontSize: 8,
    fontWeight: 'bold',
    marginTop: -40, // Gap of 5 below the image
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: 'bold',
    color: "#44483E",
    marginTop: 10,
  },
  inputStyle: {
    alignSelf: "stretch",
    borderColor: "#44483E",
    borderWidth: 1,
    borderRadius: 12,
    height: 45,
    marginBottom: 10,
    padding: 10,
    fontSize: 14,
    color: "#444",
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
    width: "100%", // Make button stretch to the width of the container
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductRedeem;