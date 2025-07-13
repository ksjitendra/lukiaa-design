import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useCallback, useState, useMemo, useEffect} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScreenProps} from '../navigation/Stack';
import MultiSelector from '../components/Selector/MultiSelector';
import {CustomImages} from '../assets/images';
import CustomButton from '../common/CustumButton';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/rootReducer';
import {OutfitStruggleOptions} from '../constants/SelectionOptions';

const occasions = [
  'College Daily Life',
  'Day-to-day Office',
  'Night Out',
  'Brunch Outing',
  'Wedding',
  'Parties',
  'Date',
  'Gym',
  'Own Birthday',
];

const timePreference = ['Day', 'Night', 'Both'];

const seasonAndWeather = [
  'Hot & Sunny',
  'Warm Evening',
  'Cold & Windy',
  'Mild & Pleasant',
  'Rainy Weather',
  'Humid & Sticky',
  'Snowy / Very Cold',
  'Indoor / AC',
];

const stylePreference = [
  'Classic & Timeless',
  'Modern & Minimalist',
  'Trendy & Fashion-Forward',
  'Streetwear / Urban',
  'Sporty / Athleisure',
  'Bohemian / Free-Spirited',
  'Chic & Elegant',
  'Edgy & Bold',
];

const budget = ['Affordable', 'Premium', 'Luxury'];

const comfortLevel = [
  'Only Comfort-First Styles',
  'Try New Styles Occasionally',
  'Experimental If It Fits Me',
  'Love to Experiment',
];

const OccasionScreen: React.FC<ScreenProps<'OccasionScreen'>> = ({
  navigation,
  route,
}) => {
  const {top, bottom} = useSafeAreaInsets();

  const [selectedOccasion, setSelectedOccasion] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedWeather, setSelectedWeather] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedComfort, setSelectedComfort] = useState('');

  const {token} = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    console.log('route.params : ', route.params);
    if (route && route.params && route.params.selectedIds) {
      setSelectedOccasion(route.params.selectedIds);
    }
  }, [route]);

  const isButtonEnabled = useMemo(() => {
    return (
      selectedOccasion &&
      selectedTime &&
      selectedWeather &&
      selectedStyle &&
      selectedBudget &&
      selectedComfort
    );
  }, [
    selectedOccasion,
    selectedTime,
    selectedWeather,
    selectedStyle,
    selectedBudget,
    selectedComfort,
  ]);

  const handleNextNav = useCallback(() => {
    const result = {
      occasionType: selectedOccasion,
      timeOfEvent: selectedTime,
      seasonWeather: selectedWeather,
      preferredStyle: selectedStyle,
      budget: selectedBudget,
      comfortLevel: selectedComfort,
    };

    navigation.navigate('OutfitDetailScreen', result);
  }, [
    navigation,
    selectedOccasion,
    selectedTime,
    selectedWeather,
    selectedStyle,
    selectedBudget,
    selectedComfort,
  ]);

  return (
    <View
      style={[styles.root, {paddingTop: top + 20, paddingBottom: bottom + 20}]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <MultiSelector
            question="What's the Occasion?"
            options={OutfitStruggleOptions.map(item => item.label)}
            value={selectedOccasion}
            onChange={setSelectedOccasion}
            questionIcon={CustomImages.target}
          />
          <MultiSelector
            question="Time Preference"
            options={timePreference}
            value={selectedTime}
            onChange={setSelectedTime}
            questionIcon={CustomImages.target}
          />
          <MultiSelector
            question="Season & Weather"
            options={seasonAndWeather}
            value={selectedWeather}
            onChange={setSelectedWeather}
            questionIcon={CustomImages.target}
          />
          <MultiSelector
            question="Style Preferences"
            options={stylePreference}
            value={selectedStyle}
            onChange={setSelectedStyle}
            questionIcon={CustomImages.target}
          />
          <MultiSelector
            question="Budget Range"
            options={budget}
            value={selectedBudget}
            onChange={setSelectedBudget}
            questionIcon={CustomImages.target}
          />
          <MultiSelector
            question="Comfort Level"
            options={comfortLevel}
            value={selectedComfort}
            onChange={setSelectedComfort}
            questionIcon={CustomImages.target}
          />
        </View>
      </ScrollView>

      <CustomButton
        title="Submit"
        onPress={handleNextNav}
        disabled={!isButtonEnabled}
        style={[styles.button, !isButtonEnabled && {opacity: 0.5}]}
      />
    </View>
  );
};

export default OccasionScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,

    paddingTop: 16,
  },
  scrollContent: {
    flexGrow: 1,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
});
