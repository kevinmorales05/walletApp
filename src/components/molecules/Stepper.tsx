import React, {useEffect, useState} from 'react';
import {Animated, Platform, StyleSheet} from 'react-native';
import {Container} from '../../components/atoms';
import Theme from '../../theme';
import {TextContainer} from './TextContainer';

interface Props {
  currentStep: number;
  totalSteps: number;
  marginVertical?: number;
  marginHorizontal?: number;
}

interface StepProps {
  index: number;
  activeIndex: number;
}

const Stepper: React.FC<Props> = ({
  currentStep,
  totalSteps,
  marginVertical,
  marginHorizontal,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    setCurrentIndex(currentStep - 1);
  }, [currentStep]);

  return (
    <Container
      row
      middle
      height={20}
      style={{marginVertical, marginHorizontal}}>
      {Array.from({length: totalSteps}).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Step key={index.toString()} index={index} activeIndex={currentIndex} />
      ))}
    </Container>
  );
};

const Step: React.FC<StepProps> = ({index, activeIndex}) => {
  const {circleStyle} = styles;

  const [lineAnimation] = useState<Animated.Value>(new Animated.Value(0));
  const [circleSizeAnimation] = useState<Animated.Value>(new Animated.Value(0));
  const [circleColorAnimation] = useState<Animated.Value>(
    new Animated.Value(0),
  );

  useEffect(() => {
    if (activeIndex === index) {
      Animated.parallel([
        Animated.timing(lineAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(circleSizeAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(circleColorAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(circleSizeAnimation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(circleColorAnimation, {
          toValue: activeIndex > index ? 1 : 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(lineAnimation, {
          toValue: activeIndex < index ? 0 : 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [activeIndex]);

  return (
    <Container key={index.toString()} row middle>
      {index > 0 && (
        <Container
          width={32}
          height={1}
          backgroundColor={Theme.Colors.MysticPool}>
          <Animated.View
            style={{
              height: 1,
              backgroundColor: Theme.Colors.BrassBalls,
              width: lineAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            }}
          />
        </Container>
      )}
      <Animated.View
        style={{
          ...circleStyle,
          width: circleSizeAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 20],
          }),
          height: circleSizeAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 20],
          }),
          backgroundColor: circleColorAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [Theme.Colors.UltralightGrey, Theme.Colors.BrassBalls],
          }),
          borderWidth: circleColorAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
        }}>
        {activeIndex === index && (
          <Animated.View style={{transform: [{scale: circleSizeAnimation}]}}>
            <TextContainer
              text={`${index + 1}`}
              typography="description"
              fontWeight="Bold"
              textColor={Theme.Colors.Bright}
              marginTop={Platform.OS === 'android' ? -1.5 : 0}
            />
          </Animated.View>
        )}
      </Animated.View>
    </Container>
  );
};

const styles = StyleSheet.create({
  circleStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    paddingLeft: 0.5,
    paddingBottom: 0.5,
    borderColor: Theme.Colors.MysticPool,
  },
});

export {Stepper};
