import React, { useMemo, useState } from 'react'
import { ScrollView, StyleSheet, useWindowDimensions, View, TouchableOpacity } from 'react-native'
import { useTasks } from "../../api/queries/queries";
import OneTask from './Task/Task';
import NewTaskDialog from './NewTask/NewTaskDialog';
import { Text } from 'react-native-paper';

type SortOption = 'name' | 'time_asc' | 'time_desc';

export default function Tasks() {
  const { data, isPending, isLoading } = useTasks();
  const [sortOption, setSortOption] = useState<SortOption>('name');

  const sortedTasks = useMemo(() => {
    if (!data) return [];

    const sorted = [...data];

    switch (sortOption) {
      // сортировка по имени
      case 'name':
        return sorted.sort((a, b) => a.taskName.localeCompare(b.taskName));

      // сортировка по времени по возрастанию
      case 'time_asc':
        return sorted.sort((a, b) => (a.time > b.time ? 1 : a.time < b.time ? -1 : 0));

      // сортировка по времени по убыванию
      case 'time_desc':
        return sorted.sort((a, b) => (a.time < b.time ? 1 : a.time > b.time ? -1 : 0));

      default:
        return sorted;
    }
  }, [data, sortOption]);

  const { height, width } = useWindowDimensions();

  const sortButtons: { label: string; value: SortOption }[] = [
    { label: 'По имени', value: 'name' },
    { label: 'Время ↑', value: 'time_asc' },
    { label: 'Время ↓', value: 'time_desc' },
  ];

  return (
    <View style={styles.tasks}>
      <View style={styles.title}>
        <Text>Всего задач: {data?.length}</Text>
      </View>

      {/* Селектор сортировки */}
      <View style={styles.sortSelector}>
        {sortButtons.map((btn) => (
          <TouchableOpacity
            key={btn.value}
            style={[
              styles.sortButton,
              sortOption === btn.value && styles.sortButtonActive,
            ]}
            onPress={() => setSortOption(btn.value)}
          >
            <Text
              style={[
                styles.sortButtonText,
                sortOption === btn.value && styles.sortButtonTextActive,
              ]}
            >
              {btn.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={[styles.scrollContainer, { maxHeight: height * 0.8, width: width * 0.9 }]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {sortedTasks.map((task) => (
          <OneTask data={task} key={`task-${task.taskId}`} />
        ))}
        <View style={{ paddingTop: 50 }} />
        <NewTaskDialog />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tasks: {
    flex: 1,
    gap: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  sortSelector: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
    marginBottom: 4,
  },
  sortButton: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  sortButtonActive: {
    backgroundColor: '#6200ee',
    borderColor: '#6200ee',
  },
  sortButtonText: {
    fontSize: 12,
    color: '#555',
  },
  sortButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  scrollContainer: {
    width: '100%',
    height: 300,
  },
  scrollContent: {
    gap: 5,
    paddingVertical: 4,
  },
});