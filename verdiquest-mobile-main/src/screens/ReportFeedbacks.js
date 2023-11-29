import React from "react";
import { View, StyleSheet, Text, ScrollView} from "react-native";
import { theme } from "../../../assets/style";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

const FeedbackScreen = () => {
  const feedbacks = [
    {
      id: '1',
      user: 'User 1',
      comment: 'It is great event! I have met people with goals',
      rating: 5,
    },
    // ... Add other feedback objects here
  ];

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <MaterialIcon
          name={i < rating ? "star" : "star-border"}
          size={16}
          color="#ffd700"
          key={i}
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.taskName}>Feedbacks</Text>
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        {feedbacks.map(feedback => (
          <View key={feedback.id} style={styles.feedbackCard}>
            <View style={styles.userAvatar} />
            <View style={styles.feedbackTextContainer}>
              <Text style={styles.feedbackText}>{feedback.comment}</Text>
              <View style={styles.starRating}>{renderStars(feedback.rating)}</View>
              <Text style={styles.userText}>{feedback.user}</Text>
            </View>
          </View>
        ))}
        <View style={styles.totalRatingContainer}>
          <Text>Total Rating:</Text>
          <Text style={styles.totalRating}>4.3</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: theme.colors.background, // Use your theme background color
  },
  header: {
    backgroundColor: '#f5f5f5', // Header background color
    paddingVertical: 20, // Padding for the header
    paddingHorizontal: 16, // Padding for the header
    justifyContent: 'center', // Center content horizontally
    alignItems: 'center', // Center content vertically
    width: '100%', // Header width
  },
  taskName: {
    fontSize: 24, // Adjust the size to match your design
        fontWeight: 'bold',
        color: 'black', // Adjust the color to match your design
  },
  scrollView: {
    width: '100%'
  },
  scrollViewContent: {
    alignItems: 'center',
      paddingVertical: 20,
  },
  feedbackCard: {
    backgroundColor: theme.colors.cardBackground, // Use your theme card background color
    flexDirection: 'row',
    padding: 10,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
  },
  userAvatar: {
    backgroundColor: theme.colors.avatarBackground, // Use your theme avatar background color
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  feedbackTextContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  feedbackText: {
    fontSize: 12, // Adjust as needed
    color: theme.colors.text, // Use your theme text color
  },
  starRating: {
    flexDirection: 'row',
    marginTop: 4,
  },
  userText: {
    fontSize: 10,
    color: theme.colors.subText, // Use your theme subtext color
    marginTop: 4,
  },
  totalRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  totalRating: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.highlight, // Use your theme highlight color
  },
  // ... other styles ...
});

export default FeedbackScreen;
