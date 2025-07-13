import {CustomImages} from '../assets/images';
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const LukiaaLoadingScreen = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Animation values
  const spinValue = useRef(new Animated.Value(0)).current;
  const pulseValue = useRef(new Animated.Value(1)).current;
  const bounceValue = useRef(new Animated.Value(0)).current;
  const fadeValue = useRef(new Animated.Value(1)).current;
  const scaleValues = useRef([
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
  ]).current;

  // Decorative elements animation
  const decorativeAnimations = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  const messages = [
    {
      text: 'Analyzing your unique style preferences...',
      icon: '👁️',
      duration: 10000,
    },
    {
      text: 'Curating outfits perfect for your occasion...',
      icon: '✨',
      duration: 10000,
    },
    {
      text: 'Matching colors and styles to your body type...',
      icon: '🎨',
      duration: 10000,
    },
    {
      text: 'Creating your personalized fashion magic...',
      icon: '🪄',
      duration: Infinity,
    },
  ];

  const colors = {
    primary: '#7A5FFF',
    accent: '#FF5C8A',
    trustBase: '#D0E2FF',
    background: '#FAFAFA',
    textPrimary: '#2B2B2B',
    textSecondary: '#6C6C6C',
    success: '#4ADE80',
    error: '#F87171',
    white: '#FFFFFF',
  };

  // Start all animations
  useEffect(() => {
    // Spinning animation
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    );

    // Pulse animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseValue, {
          toValue: 1.2,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(pulseValue, {
          toValue: 1,
          duration: 750,
          useNativeDriver: true,
        }),
      ]),
    );

    // Bounce animation
    const bounceAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: -10,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );

    // Decorative elements bounce
    decorativeAnimations.forEach((anim, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: -15,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    });

    spinAnimation.start();
    pulseAnimation.start();
    bounceAnimation.start();

    return () => {
      spinAnimation.stop();
      pulseAnimation.stop();
      bounceAnimation.stop();
    };
  }, []);

  // Timer for messages
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1000);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Message changing logic
  useEffect(() => {
    if (timeElapsed >= 10000 && timeElapsed < 20000 && currentMessage === 0) {
      setCurrentMessage(1);
      animateMessageChange();
    } else if (
      timeElapsed >= 20000 &&
      timeElapsed < 30000 &&
      currentMessage === 1
    ) {
      setCurrentMessage(2);
      animateMessageChange();
    } else if (timeElapsed >= 30000 && currentMessage === 2) {
      setCurrentMessage(3);
      animateMessageChange();
    }
  }, [timeElapsed, currentMessage]);

  // Animate progress dots
  useEffect(() => {
    scaleValues.forEach((scale, index) => {
      Animated.timing(scale, {
        toValue: index <= currentMessage ? 1.3 : 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  }, [currentMessage]);

  const animateMessageChange = () => {
    Animated.sequence([
      Animated.timing(fadeValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <>
      {/* <StatusBar barStyle="dark-content" backgroundColor={colors.background} /> */}

      {/* Background decorative elements */}
      <Animated.Text
        style={[
          styles.decorativeIcon,
          styles.decorativeIcon1,
          {transform: [{translateY: decorativeAnimations[0]}]},
        ]}>
        👗
      </Animated.Text>
      <Animated.Text
        style={[
          styles.decorativeIcon,
          styles.decorativeIcon2,
          {transform: [{translateY: decorativeAnimations[1]}]},
        ]}>
        👔
      </Animated.Text>
      <Animated.Text
        style={[
          styles.decorativeIcon,
          styles.decorativeIcon3,
          {transform: [{translateY: decorativeAnimations[2]}]},
        ]}>
        👠
      </Animated.Text>
      <Animated.Text
        style={[
          styles.decorativeIcon,
          styles.decorativeIcon4,
          {transform: [{translateY: decorativeAnimations[3]}]},
        ]}>
        👜
      </Animated.Text>

      {/* Main Loading Card */}
      <View style={styles.card}>
        {/* Logo/Brand Section */}
        <View style={styles.brandSection}>
          <Image
            source={CustomImages.transparent_logo}
            style={styles.transparentLogo}
          />
        </View>

        {/* Loading Animation */}
        <View style={styles.loadingContainer}>
          <View style={styles.loadingWrapper}>
            {/* Outer spinning ring */}
            <Animated.View
              style={[styles.outerRing, {transform: [{rotate: spin}]}]}
            />

            {/* Inner pulsing circle */}
            <Animated.View
              style={[styles.innerCircle, {transform: [{scale: pulseValue}]}]}
            />

            {/* Center icon */}
            <Animated.View
              style={[
                styles.centerIcon,
                {transform: [{translateY: bounceValue}]},
              ]}>
              <Text style={styles.iconText}>
                {messages[currentMessage].icon}
              </Text>
            </Animated.View>
          </View>
        </View>

        {/* Message Section */}
        <View style={styles.messageSection}>
          <Animated.View style={{opacity: fadeValue}}>
            <Text style={styles.messageText}>
              {messages[currentMessage].text}
            </Text>
          </Animated.View>

          {/* Progress dots */}
          <View style={styles.progressDots}>
            {messages.slice(0, 3).map((_, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      index <= currentMessage
                        ? colors.accent
                        : colors.trustBase,
                    transform: [{scale: scaleValues[index]}],
                  },
                ]}
              />
            ))}
          </View>
        </View>

        {/* Bottom decorative elements */}
        <View style={styles.bottomDecorative}>
          <Animated.View
            style={[styles.decorativeLine, {opacity: pulseValue}]}
          />
          <Animated.View
            style={[
              styles.decorativeLine,
              styles.decorativeLine2,
              {opacity: pulseValue},
            ]}
          />
          <Animated.View
            style={[
              styles.decorativeLine,
              styles.decorativeLine3,
              {opacity: pulseValue},
            ]}
          />
        </View>
      </View>

      {/* Time indicator for demo */}
      {/* <View style={styles.timeIndicator}>
        <Text style={styles.timeText}>
          {Math.floor(timeElapsed / 1000)}s elapsed
        </Text>
      </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  card: {
    width: width * 0.85,
    maxWidth: 400,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    // padding: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#D0E2FF',
  },
  brandSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#7A5FFF',
    marginBottom: 8,
  },
  brandSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6C6C6C',
  },
  transparentLogo: {
    width: 100,
    height: 100,
  },
  loadingContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  loadingWrapper: {
    width: 96,
    height: 96,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerRing: {
    position: 'absolute',
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: '#7A5FFF',
    borderTopColor: '#FF5C8A',
    opacity: 0.8,
  },
  innerCircle: {
    position: 'absolute',
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#D0E2FF',
    top: 12,
    left: 12,
  },
  centerIcon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 96,
    height: 96,
  },
  iconText: {
    fontSize: 32,
  },
  messageSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  messageText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2B2B2B',
    textAlign: 'center',
    marginBottom: 16,
    minHeight: 48,
  },
  progressDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  bottomDecorative: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 24,
  },
  decorativeLine: {
    width: 32,
    height: 4,
    backgroundColor: '#7A5FFF',
    borderRadius: 2,
  },
  decorativeLine2: {
    backgroundColor: '#FF5C8A',
  },
  decorativeLine3: {
    backgroundColor: '#D0E2FF',
  },
  tipText: {
    fontSize: 12,
    color: '#6C6C6C',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  timeIndicator: {
    marginTop: 16,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6C6C6C',
  },
  decorativeIcon: {
    position: 'absolute',
    fontSize: 32,
    opacity: 0.1,
  },
  decorativeIcon1: {
    top: height * 0.15,
    left: 32,
    color: '#7A5FFF',
  },
  decorativeIcon2: {
    top: height * 0.25,
    right: 48,
    color: '#FF5C8A',
  },
  decorativeIcon3: {
    bottom: height * 0.25,
    left: 48,
    color: '#7A5FFF',
  },
  decorativeIcon4: {
    bottom: height * 0.15,
    right: 32,
    color: '#FF5C8A',
  },
});

export default LukiaaLoadingScreen;
