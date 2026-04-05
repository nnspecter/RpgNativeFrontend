import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

type Props = {
  metric: number
  str: string
  color: {
    bg: string
    number: string
    label: string
  }
}

export default function OneMetric({ metric, str, color }: Props) {
  return (
    <View style={[styles.container, { backgroundColor: color.bg }]}>
      <Text style={[styles.metric, { color: color.number }]}>{metric}</Text>
      <Text style={[styles.label, { color: color.label }]}>{str}</Text>
    </View>
  )
}

// OneMetric
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 20,
    minWidth: 120,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },
  metric: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 36,
    color: '#6200ee',          // единый акцент проекта
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    letterSpacing: 0.3,
    color: '#6E6E6E',
  },
})