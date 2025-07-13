import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {getProfileData} from '../../axios/GetApis';
import {AppLoaderRef} from '../../navigation/RootScreen';
import {CustomToaster} from '../../components/toaster/CustomToaster';
import {ALERT_TYPE} from 'react-native-alert-notification';
import HeightSlider from '../../components/slider/HeightSlider';
import MultiSelector from '../../components/Selector/MultiSelector';
import SelectableCardGrid from '../../common/SelectableCardGrid';
import {CustomImages} from '../../assets/images';
import SkintoneSelector from '../../components/Selector/SkintoneSelector';
import SkinundertoneSelector from '../../components/Selector/SkinundertoneSelector';
import {SkintoneOption, SkinundertoneOption} from '../../types/outfitDataType';
import {cmToInches, inchesToCm} from '../../utils/helperFunctions';
import {SelectionElementType} from '../../types/selectionOptionsTypes';
import {
  BrandsDealInOptions,
  femaleBodyShapeOptions,
  femaleBodySizeOptions,
  maleBodyShapeOptions,
  maleBodySizeOptions,
  OutfitStruggleOptions,
  SkintoneOptions,
  SkinundertoneOptions,
} from '../../constants/SelectionOptions';
import {useDispatch} from 'react-redux';
import {
  resetEngagementShown,
  resetProfileSetup,
} from '../../redux/slice/userProfile';
import {logout} from '../../redux/slice/authSlice';
import {ProfileApi} from '../../axios/PutApis';
import CustomButton from '../../common/CustumButton';

type Profession =
  | 'Student'
  | 'Corporate/Office Worker'
  | 'Creative Professional'
  | 'Healthcare'
  | 'Education'
  | 'Entrepreneur'
  | 'Retail/Service'
  | 'Freelancer'
  | 'Other';

const ProfileTab = () => {
  // Dummy user data; replace with actual data/integration as needed
  const user = {
    name: 'John Doe',
    username: '@johndoe',
    bio: 'Mobile developer. Coffee enthusiast. Always learning.',
    avatar: 'https://i.pravatar.cc/150?img=3', // Placeholder avatar image
    followers: 120,
    following: 80,
  };

  const dispatch = useDispatch();

  const [profileData, setProfileData] = useState<any>();
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

  const [height, setHeight] = useState<number>(70);
  const [gender, setGender] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [bodyShape, setBodyShape] = useState<string[]>([]);
  const [bodyShapeElement, setBodyShapeElement] = useState<
    SelectionElementType[]
  >([]);
  const [bodyType, setBodyType] = useState<string[]>([]);
  const [bodyTypeElement, setBodyTypeElement] = useState<
    SelectionElementType[]
  >([]);
  const [skinTone, setSkinTone] = useState<SkintoneOption | ''>('');
  const [skinUndertone, setSkinUndertone] = useState<SkinundertoneOption | ''>(
    '',
  );
  const [profession, setProfession] = useState<Profession | ''>('');

  const [brandsDealIn, setBrandsDealIn] = useState<SelectionElementType[]>([]);
  const [mostlyStrugglesWith, setMostlyStrugglesWith] = useState<
    SelectionElementType[]
  >([]);

  useEffect(() => {
    getProfileDataFn();
  }, []);

  useEffect(() => {
    const isValid =
      height !== null &&
      gender !== '' &&
      age !== '' &&
      bodyShape.length > 0 &&
      bodyType.length > 0 &&
      skinTone !== '' &&
      skinUndertone !== '' &&
      profession !== '' &&
      brandsDealIn.length > 0 &&
      mostlyStrugglesWith.length > 0;
    setIsButtonEnabled(isValid);
  }, [
    height,
    gender,
    age,
    bodyShape.length,
    bodyType.length,
    skinTone,
    skinUndertone,
    profession,
    brandsDealIn.length,
    mostlyStrugglesWith.length,
  ]);

  const handleSelectionChangeBrand = useCallback(
    (setter: React.Dispatch<React.SetStateAction<string[]>>) =>
      (selectedIds: string[]) => {
        setter(selectedIds);
        console.log(`Selected:`, selectedIds);
      },
    [],
  );

  const profileDataApi = async () => {
    const response = await getProfileData();
    console.log(response, 'response');
    return response;
  };
  const {mutate: getProfileDataFn} = useMutation({
    mutationKey: ['profileData'],
    mutationFn: async () => await profileDataApi(),
    onMutate: () => AppLoaderRef?.current?.start(),
    onError(error, variables, context) {
      console.log(error, 'eror');

      CustomToaster({
        type: ALERT_TYPE.DANGER,
        message: error?.message ?? 'Something went wrong!',
      });
    },
    onSuccess(data, variables, context) {
      console.log(data, 'data oon success');
      setProfileData(data);
      data?.bodyShape &&
        setBodyShape(
          data?.bodyShape &&
            maleBodyShapeOptions.filter(item => item.id === data?.bodyShape),
        );
      data?.brandsDealIn &&
        setBrandsDealIn(
          BrandsDealInOptions.filter(item => item.id === data?.brandsDealIn),
        );
      data?.mostlyStuggelsWith &&
        setMostlyStrugglesWith(
          OutfitStruggleOptions.filter(item =>
            data?.mostlyStuggelsWith.includes(item.id),
          ),
        );
      data?.bodyType && setBodyType(data?.bodyType);
      data?.gender && setGender(data?.gender);
      data?.age && setAge(data?.age);
      data?.height && setHeight(cmToInches(data?.height));
      data?.profession && setProfession(data?.profession);
      data?.skinTone &&
        setSkinTone(
          SkintoneOptions.filter(item => item.type === data?.skinTone)[0],
        );
      data?.skinUndertone &&
        setSkinUndertone(
          SkinundertoneOptions.filter(
            item => item.id === data?.skinUndertone,
          )[0],
        );
    },
    onSettled: () => AppLoaderRef?.current?.stop(),
  });

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

  const handleProfileUpdateSubmit = useCallback(() => {
    if (isButtonEnabled) {
      const heightIncm = inchesToCm(height);
      const data = {
        height: heightIncm,
        gender,
        age,
        bodyShape: bodyShape[0].id,
        bodyType,
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
    age,
    bodyShape,
    bodyType,
    gender,
    height,
    brandsDealIn,
    mostlyStrugglesWith, // Fixed typo
    mutate, // Added mutate to dependencies
  ]);

  const handleSelectionChange =
    (type: 'bodyShape' | 'bodyType') => (selectedIds: string[]) => {
      if (type === 'bodyShape') {
        setBodyShape(selectedIds);
      } else {
        setBodyType(selectedIds);
      }
      console.log(`Selected ${type}:`, selectedIds);
    };

  const handleSelectionChangeElement =
    (type: 'bodyShape' | 'bodyType') =>
    (selectedItems: SelectionElementType[]) => {
      if (type === 'bodyShape') {
        setBodyShapeElement(selectedItems);
      } else {
        setBodyTypeElement(selectedItems);
      }
      console.log(`Selected ${type}:`, selectedItems);
    };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetEngagementShown());
    dispatch(resetProfileSetup());
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{uri: user.avatar}} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.bio}>{user.bio}</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <HeightSlider
          defaultHeight={height}
          onHeightChange={height => setHeight(height)}
        />
      </View>
      {/* Gender and Age Select */}
      <View style={styles.section}>
        <MultiSelector
          label="Gender"
          options={['male', 'female']}
          value={gender}
          onChange={value => {
            if (gender !== value) {
              setBodyShape([]);
            }
            setGender(value);
          }}
        />
        <MultiSelector
          label="Age"
          options={['18-24', '25-34', '35-44', '45-54', '55+']}
          value={age}
          onChange={setAge}
        />
      </View>

      {gender && (
        <View style={[styles.section, {marginTop: 10}]}>
          <SelectableCardGrid
            title="Body Shape"
            description="Choose the shape that best describes your body type"
            isBodyShapeType={true}
            selectedData={bodyShape}
            data={
              gender === 'male' ? maleBodyShapeOptions : femaleBodyShapeOptions
            }
            isMultiSelect={false}
            onSelectionChange={handleSelectionChange('bodyShape')}
            onSelectionChangeElement={handleSelectionChangeElement('bodyShape')}
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
        options={['Student', 'Professional']}
        value={profession}
        onChange={value => setProfession(value)}
      />

      <View style={styles.section}>
        <SelectableCardGrid
          title="Shopping Preference"
          description="Which price range do you usually shop in?"
          data={BrandsDealInOptions}
          selectedData={brandsDealIn}
          isMultiSelect={false}
          onSelectionChange={handleSelectionChangeBrand(setBrandsDealIn) as any}
        />
      </View>

      {/* Outfit Struggles */}
      <View style={styles.section}>
        <SelectableCardGrid
          title="Outfit Struggles"
          selectedData={mostlyStrugglesWith}
          description="Which outfits do you struggle with the most? (Select multiple)"
          data={OutfitStruggleOptions}
          isMultiSelect={true}
          onSelectionChange={
            handleSelectionChangeBrand(setMostlyStrugglesWith) as any
          } // Fixed typo
        />
      </View>

      {/* <View style={styles.buttonContainer}> */}
      <CustomButton
        title="Update Profile"
        onPress={handleProfileUpdateSubmit}
        disabled={!isButtonEnabled || isLoading}
        btnStyle={[
          styles.button,
          (!isButtonEnabled || isLoading) && {opacity: 0.3},
        ]}
      />
      {/* </View> */}
    </ScrollView>
  );
};

export default ProfileTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    // alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  section: {
    marginBottom: 6,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },
  username: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  bio: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    marginBottom: 4,
    maxWidth: 250,
  },
  stats: {
    flexDirection: 'row',
    marginBottom: 32,
  },
  statItem: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  statLabel: {
    fontSize: 14,
    color: '#888',
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 6,
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
