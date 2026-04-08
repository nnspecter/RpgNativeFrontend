import React, { useState } from 'react'
import { View } from 'react-native'
import Tasks from '../../components/Tasks/Tasks'
import Metrics from '../../components/Metrics/Metrics'
import Character from '../../components/Character/Character'
import { useTimerStore } from '../../ZustandStore/timerStore'
import Timer from '../../components/Timer/Timer'
import AfterCompleteSnackbar from '../../components/Snackbar/Snackbar'
export default function Main(){
  const {isTimer, setIsTimer} = useTimerStore();
  return (
    <View >
      
      {!isTimer ?
      <View style={{paddingBottom: 30, gap: 10, paddingTop: 30, alignContent: "center", alignSelf: "center"}}>
        <Character/>
        <Tasks/>
        <Metrics/>
        <AfterCompleteSnackbar/>
      </View>
    :
    <Timer/>}
    
    </View>
  )
}
