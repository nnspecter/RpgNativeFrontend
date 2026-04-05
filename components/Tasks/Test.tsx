import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, { useAnimatedStyle } from 'react-native-reanimated';
import { SharedValue } from 'react-native-reanimated';

function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + 50 }],
    };
  });

  return (
    <Reanimated.View style={[styleAnimation, styles.rightActionContainer]}>
      <Text style={styles.rightAction}>Text</Text>
    </Reanimated.View>
  );
}

export default function Example() {
  return (
      <ReanimatedSwipeable
        containerStyle={styles.swipeable}
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={RightAction}
      >
        <Text style={styles.swipeableText}>Swipe me!</Text>
      </ReanimatedSwipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swipeable: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  swipeableText: {
    padding: 16,
    fontSize: 16,
  },
  rightActionContainer: {
    backgroundColor: '#dd2c00',
    justifyContent: 'center',
    width: 50,
  },
  rightAction: {
    color: '#fff',
    fontWeight: '600',
    padding: 8,
    textAlign: 'center',
  },
});