import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Dialog, IconButton, Portal, Text, TextInput, useTheme } from 'react-native-paper';
import { Task } from '../../../api/axios/apiTypes';
import TimeSetter from '../../../features/TimeSetter/TimeSetter';
import { useUpdTask } from '../../../api/mutations/mutations';

export default function ChangeTaskDialog({task}: {task: Task}) {
  const theme = useTheme(); // Получаем тему для консистентности цветов
  const [visible, setVisible] = useState(false);
  const newTaskMutation = useUpdTask();
  const [newTask, setNewTask] = useState<Task>({
    taskId: task?.taskId,
    taskName: task.taskName,
    description: task.description,
    time: task.time,
    isComplete: task.isComplete
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
    hideDialog();
  };

  return (
    <View>
      {newTaskMutation.isPending ? (
        <View style={styles.loaderWrapper}>
          <ActivityIndicator size="small" color={theme.colors.primary} />
        </View>
      ) : (
        <IconButton
          mode="contained"
          onPress={() => setVisible(true)}
          icon="pencil"
          style={styles.createBtn}
        />
      )}
      
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
          <Dialog.Title style={styles.dialogTitle}>Редактирование задачи</Dialog.Title>
          
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
              Сохранить
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
  },
  loaderWrapper: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
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