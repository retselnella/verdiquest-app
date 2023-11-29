import React from 'react';
import RewardCard from '../components/RewardCard';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const localImage = require('../../assets/img/verdiquestlogo-ver2.png');

const ProductConfirm = () => {
  return (
    
        <View style={styles.cardContainer}>
      <Image source={localImage} style={styles.cardImage} />
      <Text style={styles.productDescriptionTitle}>Product Description</Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.productDescriptionText}>
          When you redeem your points for a charity donation, you'll have the option to choose from a list of carefully selected nonprofits organizations that are doing amazing work for the environment, animals, and people in need.
        </Text>
      </View>
      <Text style={styles.productDescriptionTitle}>Details</Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.productDescriptionText}>
        A portion of the proceeds from every VerdiQuest t-shirt purchase goes towards supporting sustainable initiatives and organizations around the world.        </Text>
      </View>
      <Text style={styles.productDescription}>Do you wish to redeem the product?</Text>
      <TouchableOpacity style={styles.earnPointsButton}>
        <Text style={styles.earnPointsButtonText}>YES</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.earnPointsButton}>
        <Text style={styles.earnPointsButtonText}>NO</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // This is the background color of the whole screen
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 20, // Space between the RewardCard and the description
  },
  cardContainer: {
    backgroundColor: 'white',
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
    width: 105, // Reduced width
    height: 105, // Reduced height
    borderRadius: 15, // Adjust for rounded corners
  },
  descriptionContainer: {
    backgroundColor: "rgba(123, 144, 75, 0.25);",
    padding: 30,
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
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
  productDescription: {
    fontWeight: 'bold',
    marginBottom: 8,
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 16,
  },
});

export default ProductConfirm;
