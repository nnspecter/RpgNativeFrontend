import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { Button, IconButton, Surface, useTheme } from 'react-native-paper'
import { useTimerStore } from '../../ZustandStore/timerStore'

const { width, height } = Dimensions.get('window')

export default function Timer() {
  const { setIsTimer, selectedTask } = useTimerStore()
  const theme = useTheme()

  const totalSeconds = (selectedTask?.minutes ?? 25) * 60
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)

  useEffect(() => {
    if (!isPaused && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current)
            setIsTimer(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(intervalRef.current)
  }, [isPaused])

  const fill = Math.round(((totalSeconds - secondsLeft) / totalSeconds) * 100)

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60
  const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

  const handlePause = () => {
    if (isPaused) {
      setIsPaused(false)
    } else {
      clearInterval(intervalRef.current)
      setIsPaused(true)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <Text style={styles.taskName} numberOfLines={2}>
        {selectedTask?.taskName ?? 'Фокус-сессия'}
      </Text>

      <View style={styles.circleWrapper}>
        <AnimatedCircularProgress
          size={width * 0.75}
          width={10}
          fill={fill}
          tintColor="#7c6ff7"
          backgroundColor="#e0deff"
          rotation={0}
          lineCap="round"
          duration={800}
        >
          {() => (
            <View style={styles.innerCircle}>
              <Text style={styles.timeText}>{timeString}</Text>
              <Text style={styles.labelText}>
                {isPaused ? 'пауза' : 'осталось'}
              </Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>

      <Surface style={styles.buttonRow} elevation={0}>
        <IconButton
          icon={isPaused ? 'play' : 'pause'}
          mode="contained"
          containerColor="#7c6ff7"
          iconColor="#ffffff"
          size={32}
          style={styles.pauseIcon}
          onPress={handlePause}
        />
        <Text style={styles.pauseLabel}>
          {isPaused ? 'Продолжить' : 'Пауза'}
        </Text>
      </Surface>

      <Button
        mode="outlined"
        onPress={() => setIsTimer(false)}
        style={styles.endButton}
        contentStyle={styles.endButtonContent}
        labelStyle={styles.endButtonLabel}
        textColor="#e24b4a"
        rippleColor="rgba(226,75,74,0.10)"
      >
        Завершить досрочно
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  taskName: {
    color: '#3c3489',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.3,
    maxWidth: width * 0.8,
  },
  circleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    color: '#26215c',
    fontSize: 56,
    fontWeight: '300',
    letterSpacing: 4,
    fontVariant: ['tabular-nums'],
  },
  labelText: {
    color: '#7f77dd',
    fontSize: 14,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  buttonRow: {
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  pauseIcon: {
    borderRadius: 50,
    width: 68,
    height: 68,
  },
  pauseLabel: {
    color: '#534ab7',
    fontSize: 13,
    marginTop: 8,
    letterSpacing: 0.5,
  },
  endButton: {
    borderColor: '#e24b4a',
    borderWidth: 1,
    borderRadius: 8,
    width: width * 0.7,
  },
  endButtonContent: {
    paddingVertical: 6,
  },
  endButtonLabel: {
    fontSize: 14,
    letterSpacing: 0.5,
  },
})