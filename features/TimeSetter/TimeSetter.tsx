// TimeSetter.tsx
import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WheelPicker } from 'react-native-infinite-wheel-picker';

interface TimeSetterProps {
  time: number; // Общее время в минутах
  setTime: (time: number) => void;
}

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));


export const TimeSetter: React.FC<TimeSetterProps> = ({ time, setTime }) => {
  const hours = useMemo(() => Math.floor(time / 60) % 24, [time]);
  const minutes = useMemo(() => time % 60, [time]);

  const handleHoursChange = (index: number) => {
    setTime(index * 60 + minutes);
  };

  const handleMinutesChange = (index: number) => {
    setTime(hours * 60 + index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Время</Text>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Часы</Text>
          <WheelPicker
            data={HOURS}
            initialSelectedIndex={hours}
            selectedIndex={hours}
            onChangeValue={(index) => handleHoursChange(index)}
            restElements={2}
            elementHeight={56}
            containerStyle={styles.wheelContainer}
            selectedLayoutStyle={styles.selectedLayout}
            elementTextStyle={styles.elementText}
          />
        </View>

        <Text style={styles.colon}>:</Text>

        <View style={styles.column}>
          <Text style={styles.label}>Минуты</Text>
          <WheelPicker
            data={MINUTES}
            initialSelectedIndex={minutes}
            selectedIndex={minutes}
            onChangeValue={(index) => handleMinutesChange(index)}
            restElements={2}
            elementHeight={56}
            containerStyle={styles.wheelContainer}
            selectedLayoutStyle={styles.selectedLayout}
            elementTextStyle={styles.elementText}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  column: {
    alignItems: 'center',
    width: 90,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  wheelContainer: {
    width: 90,
  },
  selectedLayout: {
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
  },
  elementText: {
    fontSize: 20,
    color: '#1C1C1E',
  },
  colon: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1C1C1E',
    marginTop: 24,
    paddingHorizontal: 4,
  },
});

export default TimeSetter;