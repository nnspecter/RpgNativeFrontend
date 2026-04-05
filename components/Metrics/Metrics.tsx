import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useMetrics } from '../../api/queries/queries'
import OneMetric from './OneMetric/OneMetric'

const COLORS = {
  streak: {
    bg: '#EEEDFE',
    number: '#3C3489',
    label: '#534AB7',
  },
  done: {
    bg: '#E1F5EE',
    number: '#085041',
    label: '#0F6E56',
  },
}

export default function Metrics() {
  const { data, isPending } = useMetrics()

  return (
    <View style={styles.container}>
      <OneMetric metric={data?.streak ?? 0} str="Стрик" color={COLORS.streak} />
      <OneMetric metric={data?.count ?? 0} str="Выполнено" color={COLORS.done} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
})