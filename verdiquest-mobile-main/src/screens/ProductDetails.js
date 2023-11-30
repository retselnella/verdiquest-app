import React from 'react';
import RewardCard from '../components/RewardCard';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const localImage = require('../../assets/img/verdiquestlogo-ver2.png');

const ProductDetails = () => {
  return (
    
    <View style={styles.container}>
        <View style={styles.header}>
        <RewardCard  />
            </View>
        <View style={styles.cardContainer}>
          <Image source={localImage} style={styles.cardImage} />
          <Text style={styles.productDescriptionTitle}>Product Description</Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.productDescriptionText}>
              When you redeem your points for a charity donation, you'll have the option to choose from a list of carefully selected nonprofits organizations that are doing amazing work for the environment, animals, and people in need.
            </Text>
          </View>
          <TouchableOpacity style={styles.earnPointsButton}>
            <Text style={styles.earnPointsButtonText}>REDEEM</Text>
          </TouchableOpacity>

          <Text style={styles.insufficientBalanceText}>
            Ineligible to redeem, insufficient balance
          </Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', 
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 20, 
  },
  cardContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 4,
  },
  pointsContainer: {
    flexDirection: 'row',
    margin: 30,
    borderRadius: 15,
},
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 10, 
  },
  descriptionContainer: {
    backgroundColor: "rgba(123, 144, 75, 0.25);",
    padding: 30,
    width: "100%",
    alignItems: "center",
    borderRadius: 20,
  },
  productDescriptionTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 16,
  },
  productDescriptionText: {
    fontSize: 12,
    color: '#666',
    alignSelf: 'stretch',
  },
  earnPointsButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 16,
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 4,
    
  },
  earnPointsButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  insufficientBalanceText: {
    color: 'red',
    fontSize: 12,
    marginTop: 8,
  },
});

export default ProductDetails;
