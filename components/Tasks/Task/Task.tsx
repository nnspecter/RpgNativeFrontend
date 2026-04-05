import React, { useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Task } from "../../../api/axios/apiTypes";
import { Button, Text } from 'react-native-paper';
import ChangeTaskDialog from '../ChangeTaskDialog/ChangeTaskDialog';
import DeleteTaskDialog from '../DeleteTaskDialog/DeleteTaskDialog';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { formatMinutes } from '../../../features/TimeFormatters/formatMinutes';
import { useTimerStore } from '../../../ZustandStore/timerStore';



export default function OneTask({ data }: { data: Task }) {
  const {setSelectedTask, setIsTimer} = useTimerStore();
  const swipeableRef = useRef<any>(null);


  const renderRightActions = (
    prog: SharedValue<number>,
    drag: SharedValue<number>
  ) => (
    <Reanimated.View
      style={[
        styles.rightActions,
        useAnimatedStyle(() => ({
          transform: [{ translateX: drag.value + 130 }],
        })),
      ]}
    >
      <DeleteTaskDialog task={data} />
      <ChangeTaskDialog task={data} />
    </Reanimated.View>
  );

  const handleStart = () => {
    setSelectedTask(data.taskName, data.time);
    setIsTimer(true);
  }

  return (
    <Swipeable
      ref={swipeableRef}
      friction={2}
      rightThreshold={40}
      renderRightActions={renderRightActions}
      containerStyle={styles.swipeableContainer}
    >
      <View style={styles.card}>
        {/* Левая часть — информация */}
        <View style={styles.info}>
          <Text variant="titleMedium" style={styles.taskName} numberOfLines={1}>
            {data.taskName}
          </Text>
          {data.description ? (
            <Text variant="bodySmall" style={styles.description} numberOfLines={2}>
              {data.description}
            </Text>
          ) : null}
          {data.time ? (
            <View style={styles.timeBadge}>
              <Text style={styles.timeText}>{formatMinutes(data.time)}</Text>
            </View>
          ) : null}
        </View>

        {/* Правая часть — кнопка */}
        <Button
          mode="contained"
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
          onPress={handleStart}
        >
          Начать
        </Button>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  swipeableContainer: {
    width: '100%',
    padding: 2,
    borderRadius: 20,
    marginBottom: 8,
  },
  card: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
    gap: 12,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  taskName: {
    fontWeight: '700',
    color: '#1C1B1F',
  },
  description: {
    color: '#6E6E6E',
    lineHeight: 18,
  },
  timeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EEF0FF',
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginTop: 2,
  },
  timeText: {
    color: '#3D5AFE',
    fontWeight: '600',
    fontSize: 12,
  },
  button: {
    borderRadius: 12,
    alignSelf: 'center',
    backgroundColor: '#6200ee',
    borderColor: '#6200ee',
  },
  buttonContent: {
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  buttonLabel: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
  actionBtn: {
    width: 44,
    height: 44,
  },
});