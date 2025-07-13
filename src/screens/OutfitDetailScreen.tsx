import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  Image,
  FlatList,
  ListRenderItemInfo,
  Pressable,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {colors} from '../constants/colors';
import {CustomImages} from '../assets/images';
import CompleteLookCard from '../components/card/CompleteLookCard';
import {OutfitDataType} from '../types/outfitDataType';
import {keyExtractor} from '../utils/helperFunctions';
import CustomButton from '../common/CustumButton';
import ReadMoreText from '../common/ReadMoreText';
import LinearGradient from 'react-native-linear-gradient';
import ImageViewModal from '../components/modals/ImageViewModal';
import {ModalRefType} from '../types/otherTypes';
import {getOutfits, getOutfitsImage} from '../axios/GetApis';
import {ScreenProps} from '../navigation/Stack';
import {useMutation} from '@tanstack/react-query';
import {AppLoaderRef} from '../navigation/RootScreen';
import {CustomToaster} from '../components/toaster/CustomToaster';
import {ALERT_TYPE} from 'react-native-alert-notification';

const DummyData: OutfitDataType = {
  id: '1',
  heading: 'Office party • Professional',
  title: 'Sophisticated Evening Wear',
  description:
    'Elevate your evening with this sophisticated outfit, perfect for formal gatherings or upscale events. The ensemble features a tailored black tuxedo jacket with satin lapels, paired with crisp white dress trousers. The look is completed with a classic black bow tie and polished leather shoes, ensuring you make a lasting impression.',
  ai_score: 4.8,
  image:
    'https://www.artisansoul.in/cdn/shop/products/7c_71eb85b9-8587-48c1-9ba9-82cfb3e4179f.jpg?v=1680788083',
  CompleteLookData: [
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlg1uJSWpMOXfYvcYgQXHBlrcqgexzVNQ58g&s',
      title: 'Watch',
      price: '$299.99',
      store: 'Zara',
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8v1mnCZNia_UCrZho66AChi2w8j9JSEgVgg&s',
      title: 'Heels',
      price: '$89.99',
      store: 'Nordstrom',
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE2QYWk3hSM_ZECLaraK1D_JtU4BrHE0AuFw&s',
      title: 'Earrings',
      price: '$49.99',
      store: "Macy's",
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjlmDNx9LI0AzomzCQZZkB9bllGI49J9tRhg&s',
      title: 'Vanity Bag',
      price: '$199.99',
      store: 'Rolex',
    },
  ],
};

const OutfitDetailScreen: React.FC<ScreenProps<'OutfitDetailScreen'>> = ({
  route,
}) => {
  const imageModalRef = useRef<ModalRefType>(null);
  const [OutfitData, setOutfitData] = useState<any>();
  const [Refreshing, setRefreshing] = useState(false);

  // Add these state variables at the top of your component
  const [productImages, setProductImages] = useState<Record<string, string>>(
    {},
  );
  const [isFirstImageLoaded, setIsFirstImageLoaded] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);
  const [imageFetchError, setImageFetchError] = useState<string | null>(null);

  // Replace the current fetchImage function with this
  const fetchImagesSequentially = useCallback(async (items: any[]) => {
    try {
      // First fetch the first image
      if (items[0]?.promptForAIImageGeneration) {
        const firstImage = await getOutfitsImage(
          items[0].promptForAIImageGeneration,
        );
        AppLoaderRef?.current?.stop();
        console.log(firstImage, 'firstImage');
        if (!firstImage) {
          AppLoaderRef?.current?.stop();
          throw new Error('Failed to load first outfit image');
        }

        // Update state with first image
        setProductImages(prev => ({
          ...prev,
          [items[0].accessoriesAndFootwear]: firstImage,
        }));
        setIsFirstImageLoaded(true);

        // Fetch remaining images one by one
        for (let i = 1; i < items.length; i++) {
          const item = items[i];
          if (item?.promptForAIImageGeneration) {
            try {
              const imageUrl = await getOutfitsImage(
                item.promptForAIImageGeneration,
              );
              console.log(imageUrl, 'imageUrl');
              if (imageUrl) {
                setProductImages(prev => ({
                  ...prev,
                  [item.accessoriesAndFootwear]: imageUrl,
                }));
              }
            } catch (err) {
              console.error(
                `Error fetching image for item ${item.accessoriesAndFootwear}:`,
                err,
              );
              // Continue with next image even if one fails
            }
          }
        }
      }
    } catch (error) {
      console.error('Error in sequential image fetch:', error);
      setImageFetchError('Failed to load outfit images');
      CustomToaster({
        type: ALERT_TYPE.DANGER,
        message: 'Failed to load outfit images. Please try again.',
      });
    }
  }, []);

  const params = route.params;
  console.log(params, 'params');

  const handleImagePress = useCallback(
    (accessoriesAndFootwear: string) => {
      setModalImageUrl(productImages[accessoriesAndFootwear]);
      imageModalRef.current?.open?.();
    },
    [productImages],
  );

  const {mutate: getOutFitData} = useMutation({
    mutationKey: ['outfitPrefrence'],
    mutationFn: async () => await getOutfits(params),
    onMutate: () => AppLoaderRef?.current?.start(true),
    onError(error, variables, context) {
      console.log(error, 'eror');

      CustomToaster({
        type: ALERT_TYPE.DANGER,
        message: error?.message ?? 'Something went wrong!',
      });
      AppLoaderRef?.current?.stop();
    },
    onSuccess(data, variables, context) {
      console.log(data, 'success data');
      setOutfitData(data?.outfits);
      if (data?.outfits.length > 0) {
        fetchImagesSequentially(data?.outfits);
      }
    },
    // onSettled: () => AppLoaderRef?.current?.stop(),
  });

  // const fetchOutfitData = useCallback(async () => {
  //   try {
  //     setRefreshing(true);
  //     const response = await getOutfits(params);
  //     setOutfitData(response);
  //   } catch (error) {
  //     console.error('Error fetching outfit data:', error);
  //   } finally {
  //     setRefreshing(false);
  //   }
  // }, []);

  useEffect(() => {
    getOutFitData();
  }, []);

  const renderLookItems = useCallback(
    ({item}: ListRenderItemInfo<OutfitDataType['CompleteLookData'][0]>) => {
      return <CompleteLookCard item={item} />;
    },
    [],
  );

  const renderMajorItem = itemData => {
    console.log(itemData, 'itemData');
    let ImageUrl = '';

    // const {mutate} = useMutation({
    //   mutationKey: ['imageApi'],
    //   mutationFn: async () =>
    //     await getOutfitsImage(itemData?.promptForAIImageGeneration),
    //   onMutate: () => AppLoaderRef?.current?.start(),
    //   onError(error, variables, context) {
    //     console.log(error);
    //     CustomToaster({
    //       type: ALERT_TYPE.DANGER,
    //       message: error?.message ?? 'Image is not working try again!',
    //     });
    //   },
    //   onSuccess(data, variables, context) {
    //     console.log(data, 'data');
    //     ImageUrl = data?.data;
    //   },
    //   onSettled: () => AppLoaderRef?.current?.stop,
    // });

    return (
      <View style={styles.cardContainer}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{itemData?.outfitTitle}</Text>

          <ReadMoreText style={styles.cardDescription}>
            {itemData?.outfitSummary}
          </ReadMoreText>

          <Pressable
            style={styles.cardImageContainer}
            onPress={() => handleImagePress(itemData?.accessoriesAndFootwear)}>
            {productImages[itemData?.accessoriesAndFootwear] ? (
              <Image
                // source={{uri: productImages[itemData?.id] ?? DummyData?.image}}
                source={{
                  uri: productImages[itemData?.accessoriesAndFootwear]
                    ? productImages[itemData?.accessoriesAndFootwear]
                    : DummyData?.image,
                }}
                style={styles.image}
              />
            ) : (
              <ActivityIndicator
                size="large"
                color={colors.gradientstartColor}
              />
            )}

            <View style={styles.viewFullContainer}>
              <Text style={styles.heading}>Tap to view Full</Text>
            </View>
          </Pressable>
        </View>

        <Text style={styles.lookText}>Complete Look</Text>
        {/* this part is static beow */}
        <FlatList
          data={DummyData.CompleteLookData}
          keyExtractor={keyExtractor}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderLookItems}
          removeClippedSubviews
          contentContainerStyle={styles.flatList}
        />
        <CustomButton
          title="Save Complete Outfit"
          onPress={() => {}}
          btnStyle={styles.btn}
        />
        <ImageViewModal
          ref={imageModalRef}
          imageUrl={modalImageUrl ? modalImageUrl : DummyData.image}
        />
      </View>
    );
  };

  console.log(OutfitData, 'outputData');

  const isLoading = AppLoaderRef?.current?.isLoading();

  return (
    <SafeAreaView style={styles.scrollView}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.mainCont}
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={Refreshing}
            onRefresh={() => getOutFitData()}
            colors={[colors.gradientstartColor, colors.gradientendColor]}
            tintColor={colors.gradientstartColor}
          />
        }>
        <>
          {/* {!isLoading && (
            <LinearGradient
              colors={[colors.gradientstartColor, colors.gradientendColor]}
              style={styles.headingContainer}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Text style={styles.heading}>{DummyData.heading}</Text>
            </LinearGradient>
          )} */}
          {isFirstImageLoaded && OutfitData
            ? OutfitData?.map((item, index) => renderMajorItem(item, index))
            : null}
        </>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainCont: {flexGrow: 1, backgroundColor: colors.white},
  scrollView: {flex: 1, backgroundColor: colors.white},
  // Card Styles
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  cardImageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#f5f5f5',
  },
  topContainer: {padding: 16},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 8,
  },
  desc: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
  },
  star: {width: 15, height: 15},
  scoreText: {fontSize: 14, color: colors.textSecondary, alignSelf: 'center'},
  imageContainer: {
    height: 250,
    width: '100%',
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f4f4f4',
  },
  image: {height: '100%', width: '100%', resizeMode: 'contain'},
  lookText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
    marginTop: 5,
    marginLeft: 16,
  },
  flatList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    marginTop: 10,
  },
  btn: {
    height: 50,
    margin: 10,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  headingContainer: {
    padding: 10,
    borderRadius: 25,
    marginBottom: 10,
    justifyContent: 'center',
    marginLeft: -10,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
  },
  heading: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.white,
  },
  viewFullContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
});
export default OutfitDetailScreen;
