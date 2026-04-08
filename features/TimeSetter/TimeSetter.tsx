import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { WheelPicker } from 'react-native-infinite-wheel-picker';
import { AppTheme } from '../../theme/paperTheme';

interface TimeSetterProps {
  time: number;
  setTime: (time: number) => void;
}

const HOURS = Array.from({ length: 24 }, (_, i) =>
  String(i).padStart(2, '0')
);
const MINUTES = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, '0')
);

export const TimeSetter: React.FC<TimeSetterProps> = ({ time, setTime }) => {
  const { colors, dark } = useTheme<AppTheme>();

  const hours = useMemo(() => Math.floor(time / 60) % 24, [time]);
  const minutes = useMemo(() => time % 60, [time]);

  const handleHoursChange = (index: number) => {
    setTime(index * 60 + minutes);
  };

  const handleMinutesChange = (index: number) => {
    setTime(hours * 60 + index);
  };

  // 🔥 важно: мемоизация стилей
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: colors.card,
          borderRadius: 20,
          padding: 24,
          alignItems: 'center',
        },
        title: {
          fontSize: 17,
          fontWeight: '600',
          color: colors.onBackground,
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
          color: colors.onBackground,
          marginBottom: 8,
        },
        wheelContainer: {
          width: 90,
        },
        selectedLayout: {
          backgroundColor: dark
            ? colors.border
            : '#F2F2F7', // можно тоже вынести в тему если хочешь
          borderRadius: 10,
        },
        elementText: {
          fontSize: 20,
          color: colors.onBackground,
        },
        colon: {
          fontSize: 28,
          fontWeight: '700',
          color: colors.onBackground,
          marginTop: 24,
          paddingHorizontal: 4,
        },
      }),
    [colors, dark]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Время</Text>

      <View style={styles.row}>
        {/* ЧАСЫ */}
        <View style={styles.column}>
          <Text style={styles.label}>Часы</Text>
          <WheelPicker
            data={HOURS}
            selectedIndex={hours}
            onChangeValue={handleHoursChange}
            restElements={2}
            elementHeight={56}
            containerStyle={styles.wheelContainer}
            selectedLayoutStyle={styles.selectedLayout}
            elementTextStyle={styles.elementText}
          />
        </View>

        <Text style={styles.colon}>:</Text>

        {/* МИНУТЫ */}
        <View style={styles.column}>
          <Text style={styles.label}>Минуты</Text>
          <WheelPicker
            data={MINUTES}
            selectedIndex={minutes}
            onChangeValue={handleMinutesChange}
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

export default TimeSetter;