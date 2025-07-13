import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import React, {useCallback, useState, useEffect} from 'react';
import SelectableCardGrid from '../common/SelectableCardGrid';
import HeightSlider from '../components/slider/HeightSlider';
import CustomButton from '../common/CustumButton'; // Note: Typo in import (CustumButton -> CustomButton)
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScreenProps} from '../navigation/Stack';
import {cmToInches, inchesToCm} from '../utils/helperFunctions';
import ProgressIndicator from '../components/header/CustomHeader';
import MultiSelector from '../components/Selector/MultiSelector';
import {
  ageTypes,
  bodyShapeOptions,
  femaleBodyShapeOptions,
  femaleBodySizeOptions,
  genderTypes,
  maleBodyShapeOptions,
  maleBodySizeOptions,
} from '../constants/SelectionOptions';
import {SelectionElementType} from '../types/selectionOptionsTypes';
import {useFocusEffect} from '@react-navigation/native';

const ProfileScreen: React.FC<ScreenProps<'ProfileScreen'>> = ({
  navigation,
}) => {
  const [height, setHeight] = useState<number>(70);
  const [gender, setGender] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [bodyShape, setBodyShape] = useState<SelectionElementType[]>([]);
  const [bodyShapeElement, setBodyShapeElement] = useState<
    SelectionElementType[]
  >([]);
  const [bodyType, setBodyType] = useState<string[]>([]);
  const [bodyTypeElement, setBodyTypeElement] = useState<
    SelectionElementType[]
  >([]);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('transparent');
    }, []),
  );

  // Validate if all required fields are filled
  useEffect(() => {
    console.log(bodyShape, bodyType, gender, age, height, 'all values');
    const isValid =
      height !== null &&
      gender !== '' &&
      age !== '' &&
      bodyShape.length > 0 &&
      bodyType.length > 0;
    setIsButtonEnabled(isValid);
  }, [height, gender, age, bodyShape, bodyType]);

  const handleSelectionChange =
    (type: 'bodyShape' | 'bodyType') =>
    (selectedIds: SelectionElementType[]) => {
      if (type === 'bodyShape') {
        setBodyShape(selectedIds);
      } else {
        setBodyType(selectedIds.map(item => item.id));
      }
      console.log(`Selected ${type}:`, selectedIds);
    };

  const handleNextNav = useCallback(() => {
    if (isButtonEnabled) {
      console.log('Navigating to Step 2', {
        height,
        gender,
        age,
        bodyShape,
        bodyType,
      });

      let heightIncm = inchesToCm(height);
      console.log(heightIncm, 'heightIncm');

      navigation.navigate('ProfileScreenTwo', {
        height: heightIncm,
        gender,
        age,
        bodyShape: bodyShape[0].id,
        bodyType,
      });
      // Add navigation logic here
    }
  }, [isButtonEnabled, height, gender, age, bodyShape, bodyType]);

  const {top, bottom} = useSafeAreaInsets();

  console.log(isButtonEnabled);

  return (
    <View style={{flex: 1}}>
      <ProgressIndicator isPageOneComplete={false} isPageTwoComplete={false} />
      <View style={[styles.container, {marginBottom: bottom}]}>
        <ScrollView
          contentContainerStyle={[styles.scrollContent]}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled>
          {/* Height Section */}
          <View style={styles.section}>
            <HeightSlider onHeightChange={height => setHeight(height)} />
          </View>

          {/* Gender and Age Select */}
          <View style={styles.section}>
            <MultiSelector
              label="Gender"
              options={genderTypes}
              value={gender}
              onChange={value => {
                if (gender !== value) {
                  setBodyShape([]);
                  setBodyType([]);
                }
                setGender(value);
              }}
            />
            <MultiSelector
              label="Age"
              options={ageTypes}
              value={age}
              onChange={setAge}
            />
          </View>

          {/* Body Shape */}
          {gender && (
            <View style={[styles.section, {marginTop: 10}]}>
              <SelectableCardGrid
                title="Body Shape"
                description="Choose the shape that best describes your body type"
                isBodyShapeType={true}
                data={
                  gender === 'male'
                    ? maleBodyShapeOptions
                    : femaleBodyShapeOptions
                }
                selectedData={bodyShape}
                isMultiSelect={false}
                onSelectionChange={handleSelectionChange('bodyShape')}
                // onSelectionChangeElement={handleSelectionChangeElement('bodyShape')}
              />
            </View>
          )}

          {/* Body Size */}
          {gender && (
            <View style={styles.section}>
              <MultiSelector
                label="Body Size"
                options={
                  gender === 'male'
                    ? maleBodySizeOptions.map(item => item.label)
                    : femaleBodySizeOptions.map(item => item.label)
                }
                value={bodyType}
                onChange={setBodyType}
              />
            </View>
          )}
        </ScrollView>
        <CustomButton
          title="Continue to Step 2"
          onPress={handleNextNav}
          disabled={!isButtonEnabled}
          style={[styles.button, !isButtonEnabled && {opacity: 0.3}]}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollContent: {},
  section: {
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  heightValueContainer: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  heightValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  button: {
    // Add any default button styles here if needed
  },
});
