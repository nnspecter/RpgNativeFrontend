import React, { useMemo } from 'react'
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native'
import {useTasks} from "../../api/queries/queries";
import OneTask from './Task/Task';
import NewTaskDialog from './NewTask/NewTaskDialog';


export default function Tasks() {
  const{data, isPending, isLoading} = useTasks();
  const sortByName = useMemo(() => {
    if (!data) return [];
    return [...data].sort((a, b) => a.taskName.localeCompare(b.taskName));
  }, [data]);

  console.log(data)
  const { height, width } = useWindowDimensions();
  return (
    <View style={styles.tasks}>
      <View style={{height: 200, width: "100%", backgroundColor: "#fa0000"}}>
        
      </View>
      <ScrollView
        style={[styles.scrollContainer, { height: height * 0.5, width: width * 0.9 }]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        {sortByName && sortByName.map((task, index) => (
          <OneTask data={task} key={`${index}+task`} />
        ))}
      </ScrollView>
      <NewTaskDialog/>
    </View>
  )
}

const styles = StyleSheet.create({
  tasks: {
    flex: 1,
    gap: 10,
    width: '80%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingBottom: 50
  },
  scrollContainer: {
    width: '100%',
  },
  scrollContent: {
    gap: 10,
    paddingVertical: 4,
  },
});