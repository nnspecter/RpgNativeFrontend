import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Dialog, IconButton, Portal, Text, useTheme } from 'react-native-paper';
import { Task } from '../../../api/axios/apiTypes';
import { useDelTask } from '../../../api/mutations/mutations';

export default function DeleteTaskDialog({ task }: { task: Task }) {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const delTaskMutation = useDelTask();

  const hideDialog = () => setVisible(false);

  const handleDelete = () => {
    if(task.taskId) delTaskMutation.mutate(task.taskId)
    hideDialog();
  };

  return (
    <View>
      {delTaskMutation.isPending ? (
        <View style={styles.loaderWrapper}>
          <ActivityIndicator size="small" color={theme.colors.error} />
        </View>
      ) : (
        <IconButton
          mode="contained"
          onPress={() => setVisible(true)}
          icon="delete"
          iconColor={theme.colors.error}
          style={styles.deleteBtn}
        />
      )}

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
          <Dialog.Title style={styles.dialogTitle}>Удаление задачи</Dialog.Title>

          <Dialog.Content style={styles.content}>
            <Text>{`Вы точно хотите удалить задачу "${task.taskName}"?`}</Text>
          </Dialog.Content>

          <Dialog.Actions style={styles.actions}>
            <Button onPress={hideDialog} textColor={theme.colors.secondary}>
              Отмена
            </Button>
            <Button
              mode="contained"
              onPress={handleDelete}
              buttonColor={theme.colors.error}
              style={styles.actionBtn}
            >
              Удалить
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
  },
  dialogTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    alignItems: 'center',
  },
  deleteBtn: {
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
  },
});