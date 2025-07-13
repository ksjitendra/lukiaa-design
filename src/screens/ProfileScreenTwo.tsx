import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState, useEffect} from 'react';
import CustomSelect from '../common/CustomSelect';
import SelectableCardGrid from '../common/SelectableCardGrid';
import {CustomImages} from '../assets/images';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScreenProps} from '../navigation/Stack';
import CustomButton from '../common/CustumButton'; // Fixed typo in import (CustumButton -> CustomButton)
import {useMutation} from '@tanstack/react-query';
import {ProfileApi} from '../axios/PutApis';
import {AppLoaderRef} from '../navigation/RootScreen';
import {CustomToaster} from '../components/toaster/CustomToaster';
import {ALERT_TYPE} from 'react-native-alert-notification';
import ProgressIndicator from '../components/header/CustomHeader';
import {useDispatch} from 'react-redux';
import {ProfileSetupCompleted} from '../redux/slice/userProfile';
import {SkintoneOption, SkinundertoneOption} from '../types/outfitDataType';
import SkintoneSelector from '../components/Selector/SkintoneSelector';
import SkinundertoneSelector from '../components/Selector/SkinundertoneSelector';
import MultiSelector from '../components/Selector/MultiSelector';
import {
  BrandsDealInOptions,
  OutfitStruggleOptions,
  professionTypes,
  SkintoneOptions,
  SkinundertoneOptions,
} from '../constants/SelectionOptions';
import {SelectionElementType} from '../types/selectionOptionsTypes';

// Define types for better type safety
type SkinTone =
  | 'Very Fair'
  | 'Fair'
  | 'Light'
  | 'Medium'
  | 'Olive'
  | 'Tan'
  | 'Dark'
  | 'Deep';
type SkinUndertone =
  | 'Cool (Pink, Red, Blue)'
  | 'Warm (Yellow, Golden, Peach)'
  | 'Neutral (Mix of Cool & Warm)'
  | 'Not Sure';
type Profession = 'Student' | 'Professional';

interface RouteParams {
  // Define expected params here
  userId?: string;
  // Add other expected params
}

const ProfileScreenTwo: React.FC<ScreenProps<'ProfileScreenTwo'>> = ({
  route,
  navigation,
}) => {
  const [skinTone, setSkinTone] = useState<SkintoneOption | ''>('');
  const [skinUndertone, setSkinUndertone] = useState<SkinundertoneOption | ''>(
    '',
  );
  const [profession, setProfession] = useState<Profession | ''>('');
  const [brandsDealIn, setBrandsDealIn] = useState<SelectionElementType[]>([]);
  const [mostlyStrugglesWith, setMostlyStrugglesWith] = useState<
    SelectionElementType[]
  >([]); // Fixed typo
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const details = route.params;
  const dispatch = useDispatch();

  const {top, bottom} = useSafeAreaInsets();

  // Validate if all required fields are filled
  useEffect(() => {
    const isValid =
      skinTone !== '' &&
      skinUndertone !== '' &&
      profession !== '' &&
      brandsDealIn.length > 0 &&
      mostlyStrugglesWith.length > 0;
    setIsButtonEnabled(isValid);
  }, [skinTone, skinUndertone, profession, brandsDealIn, mostlyStrugglesWith]);

  const handleSelectionChange = useCallback(
    (setter: React.Dispatch<React.SetStateAction<SelectionElementType[]>>) =>
      (selectedIds: SelectionElementType[]) => {
        setter(selectedIds);
        console.log(`Selected:`, selectedIds);
      },
    [],
  );

  const {mutate, isLoading} = useMutation({
    mutationFn: ProfileApi,
    onMutate: () => {
      AppLoaderRef.current?.start();
    },
    onSuccess: data => {
      console.log('Profile Completion Success:', data);
      CustomToaster({
        message: 'Profile Completed Successfully!',
        type: ALERT_TYPE.SUCCESS,
      });
      dispatch(ProfileSetupCompleted());
      // navigation.navigate('BottomTab'); // Navigate to AccountVerify on success
    },
    onError: (error: Error) => {
      console.error('Profile Completion Error:', error);
      CustomToaster({
        message:
          error.message || 'Failed to complete profile. Please try again.',
        type: ALERT_TYPE.DANGER,
      });
    },
    onSettled: () => {
      AppLoaderRef.current?.stop();
    },
  });

  const handleNextNav = useCallback(() => {
    if (isButtonEnabled) {
      const data = {
        ...details,
        skinTone: skinTone.type,
        skinUndertone: skinUndertone.id,
        profession,
        brandsDealIn: brandsDealIn[0].id,
        mostlyStuggelsWith: mostlyStrugglesWith.map(item => item.id), // Fixed typo
      };
      mutate(data);
      // navigation.navigate('BottomTab');
    }
  }, [
    isButtonEnabled,
    skinTone,
    skinUndertone,
    profession,
    brandsDealIn,
    mostlyStrugglesWith, // Fixed typo
    mutate, // Added mutate to dependencies
  ]);

  return (
    <View style={{flex: 1}}>
      <ProgressIndicator
        isPageOneComplete={details?.age && (details?.bodyShape as any)}
        isPageTwoComplete={false}
      />
      <View style={[styles.container, {marginBottom: bottom}]}>
        <ScrollView
          contentContainerStyle={[styles.scrollContent]}
          showsVerticalScrollIndicator={false}>
          {/* Skin Tone, Skin Undertone, and Profession Select */}
          <View style={styles.section}>
            <SkintoneSelector
              options={SkintoneOptions}
              selected={skinTone}
              onChange={value => setSkinTone(value)}
              style={{marginBottom: 16}}
            />
            <SkinundertoneSelector
              options={SkinundertoneOptions}
              selected={skinUndertone}
              onChange={value => setSkinUndertone(value)}
              style={{marginBottom: 16}}
            />
            <MultiSelector
              label="Profession"
              options={professionTypes}
              value={profession}
              onChange={value => setProfession(value)}
            />
          </View>

          {/* Shopping Preference */}
          <View style={styles.section}>
            <SelectableCardGrid
              title="Shopping Preference"
              description="Which price range do you usually shop in?"
              data={BrandsDealInOptions}
              selectedData={brandsDealIn}
              isMultiSelect={false}
              onSelectionChange={handleSelectionChange(setBrandsDealIn) as any}
            />
          </View>

          {/* Outfit Struggles */}
          <View style={styles.section}>
            <SelectableCardGrid
              title="Outfit Struggles"
              description="Which outfits do you struggle with the most? (Select multiple)"
              data={OutfitStruggleOptions}
              selectedData={mostlyStrugglesWith}
              isMultiSelect={true}
              onSelectionChange={
                handleSelectionChange(setMostlyStrugglesWith) as any
              } // Fixed typo
            />
          </View>
        </ScrollView>
        <CustomButton
          title="Complete Profile"
          onPress={handleNextNav}
          disabled={!isButtonEnabled || isLoading}
          style={[
            styles.button,
            (!isButtonEnabled || isLoading) && {opacity: 0.3},
          ]}
          accessibilityLabel={
            isButtonEnabled ? 'Complete Profile' : 'Complete Profile (Disabled)'
          }
        />
      </View>
    </View>
  );
};

export default ProfileScreenTwo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    marginBottom: 6,
  },
  button: {
    // Add default button styles here if needed
  },
});
