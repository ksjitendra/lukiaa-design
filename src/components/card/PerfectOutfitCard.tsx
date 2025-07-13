import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../constants/colors';

// You can replace this with a local SVG or Lottie for the sparkle icon if desired
const Sparkles = () => <Text style={styles.sparkle}>✨</Text>;

interface PerfectOutfitCardProps {
  onPress?: () => void;
}

const PerfectOutfitCard: React.FC<PerfectOutfitCardProps> = ({onPress}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.row}>
        <Sparkles />
        <Text style={styles.heading}>
          Find the <Text style={styles.bold}>Perfect Outfit</Text>
          {'\n'}
          for Your Next Occasion
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.buttonWrapper}
        onPress={onPress}>
        <LinearGradient
          colors={['#7D5FFF', '#FC5C7D']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={styles.buttonGradient}>
          <Text style={styles.buttonText}>Let's Style It Right</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    paddingVertical: 30,
    marginVertical: 16,
    shadowColor: colors.gradientstartColor,
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 16,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      android: {
        // For Android shadow
        elevation: 8,
      },
      ios: {
        // For iOS shadow
        shadowColor: colors.gradientstartColor,
        shadowOpacity: 0.08,
        shadowOffset: {width: 0, height: 4},
        shadowRadius: 16,
      },
    }),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
    alignSelf: 'flex-start',
  },
  sparkle: {
    fontSize: 22,
    marginRight: 8,
  },
  heading: {
    fontSize: 20,
    color: '#111',
    fontWeight: '600',
    flexShrink: 1,
  },
  bold: {
    fontWeight: '700',
    color: '#111',
  },
  buttonWrapper: {
    alignSelf: 'center',
    width: '80%',
  },
  buttonGradient: {
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    shadowColor: '#FC5C7D',
    shadowOpacity: 0.12,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 12,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default PerfectOutfitCard;
