import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Dialog, Portal, Text, TextInput, useTheme } from 'react-native-paper';
import { Task } from '../../../api/axios/apiTypes';
import TimeSetter from '../../../features/TimeSetter/TimeSetter';
import { useNewTask } from '../../../api/mutations/mutations';

export default function NewTaskDialog() {
  const theme = useTheme(); // Получаем тему для консистентности цветов
  const [visible, setVisible] = useState(false);
  const newTaskMutation = useNewTask();
  const [newTask, setNewTask] = useState<Task>({
    taskName: "",
    description: "",
    time: 0,
    isComplete: false
  });


  useEffect(()=>{
    console.log(newTask.time)
  }, [newTask])

  const hideDialog = () => setVisible(false);
  const setTime = (time: number) => {
    setNewTask(prev => ({ ...prev, time: time }));
  };

  const handleCreate = () => {
    if(!newTask.taskName || newTask.time <= 0) return;
    newTaskMutation.mutate(newTask);
    setNewTask({
      taskName: "",
      description: "",
      time: 0,
      isComplete: false
    })
    hideDialog();
  };

  return (
    <View>
      <Button mode="contained" onPress={() => setVisible(true)} style={styles.createBtn} disabled={newTaskMutation.isPending} loading={newTaskMutation.isPending}>
        Создать задачу
      </Button>
      
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
          <Dialog.Title style={styles.dialogTitle}>Новая задача</Dialog.Title>
          
          <Dialog.Content style={styles.container}>
            <TextInput
              label="Название задачи"
              mode="outlined"
              value={newTask.taskName}
              onChangeText={name => setNewTask(prev => ({ ...prev, taskName: name }))}
              style={styles.input}
              outlineStyle={styles.inputOutline}
              activeOutlineColor={theme.colors.primary}
            />
            
            <TextInput
              label="Описание"
              mode="outlined"
              multiline
              numberOfLines={3}
              value={newTask.description}
              onChangeText={desc => setNewTask(prev => ({ ...prev, description: desc }))}
              style={[styles.input, styles.textArea]}
              outlineStyle={styles.inputOutline}
              activeOutlineColor={theme.colors.primary}
            />

            {/* Контейнер для TimeSetter, чтобы он не слипался с инпутами */}
            <View style={styles.timeSetterWrapper}>
               <TimeSetter time={newTask.time} setTime={setTime} />
            </View>
          </Dialog.Content>

          <Dialog.Actions style={styles.actions}>
            <Button onPress={hideDialog} textColor={theme.colors.secondary}>Отмена</Button>
            <Button 
              mode="contained" 
              onPress={handleCreate} 
              disabled={!newTask.taskName}
              style={styles.actionBtn}
            >
              Создать
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: '#f9f9f9', // Чуть серый фон диалога, чтобы белый TimeSetter выделялся
    borderRadius: 20,
  },
  dialogTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    alignItems: 'center',
    gap: 12,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff', // Белый фон инпута
    fontSize: 15,
  },
  inputOutline: {
    borderRadius: 12, // Скругляем как у TimeSetter
    borderWidth: 1,
  },
  textArea: {
    minHeight: 80,
  },
  timeSetterWrapper: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  createBtn: {
    borderRadius: 10,
    backgroundColor: '#6200ee',
    borderColor: '#6200ee',
  },
  actions: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  actionBtn: {
    paddingHorizontal: 10,
    borderRadius: 10,
  }
});