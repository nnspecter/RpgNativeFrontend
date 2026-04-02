import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Task } from "../../../api/axios/apiTypes";
import { Button, Text } from 'react-native-paper';
import ChangeTaskDialog from '../ChangeTaskDialog/ChangeTaskDialog';

export default function OneTask({ data }: { data: Task }) {

  return (
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
            <Text style={styles.timeText}>{data.time}</Text>
          </View>
        ) : null}
      </View>

      {/* Правая часть — кнопка */}
      <ChangeTaskDialog task={data}/>
      <Button
        mode="contained"
        style={styles.button}
        contentStyle={styles.buttonContent}
        labelStyle={styles.buttonLabel}
      >
        Начать
      </Button>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.07)',
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
});