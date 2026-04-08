import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Dialog, Portal, TextInput, useTheme } from 'react-native-paper';
import { NewTask } from '../../../api/axios/apiTypes';
import TimeSetter from '../../../features/TimeSetter/TimeSetter';
import { useNewTask } from '../../../api/mutations/mutations';
import i18n from '../../../i18n';
import { AppTheme } from '../../../theme/paperTheme';

export default function NewTaskDialog() {
  const theme = useTheme<AppTheme>();
  const [visible, setVisible] = useState(false);
  const newTaskMutation = useNewTask();
  const [newTask, setNewTask] = useState<NewTask>({
    taskName: "",
    description: "",
    time: 0,
  });

  useEffect(() => {
    console.log(newTask.time)
  }, [newTask])

  const hideDialog = () => setVisible(false);
  const setTime = (time: number) => {
    setNewTask(prev => ({ ...prev, time }));
  };

  const handleCreate = () => {
    if (!newTask.taskName || newTask.time <= 0) return;
    newTaskMutation.mutate(newTask);
    setNewTask({ taskName: "", description: "", time: 0 });
    hideDialog();
  };

  const styles = makeStyles(theme);

  return (
    <View>
      <Button
        mode="contained"
        onPress={() => setVisible(true)}
        style={[styles.createBtn, newTaskMutation.isPending && styles.createBtnPending]}
        disabled={newTaskMutation.isPending}
        loading={newTaskMutation.isPending}
      >
        {i18n.t('taskDialog.newTask.createBtn')}
      </Button>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
          <Dialog.Title style={styles.dialogTitle}>{i18n.t('taskDialog.newTask.title')}</Dialog.Title>

          <Dialog.Content style={styles.container}>
            <TextInput
              label={i18n.t('taskDialog.fields.taskName')}
              mode="outlined"
              value={newTask.taskName}
              onChangeText={name => setNewTask(prev => ({ ...prev, taskName: name }))}
              style={styles.input}
              outlineStyle={styles.inputOutline}
              activeOutlineColor={theme.colors.primary}
            />

            <TextInput
              label={i18n.t('taskDialog.fields.description')}
              mode="outlined"
              multiline
              numberOfLines={3}
              value={newTask.description}
              onChangeText={desc => setNewTask(prev => ({ ...prev, description: desc }))}
              style={[styles.input, styles.textArea]}
              outlineStyle={styles.inputOutline}
              activeOutlineColor={theme.colors.primary}
            />

            <View style={styles.timeSetterWrapper}>
              <TimeSetter time={newTask.time} setTime={setTime} />
            </View>
          </Dialog.Content>

          <Dialog.Actions style={styles.actions}>
            <Button onPress={hideDialog} textColor={theme.colors.secondary}>
              {i18n.t('taskDialog.cancel')}
            </Button>
            <Button
              mode="contained"
              onPress={handleCreate}
              disabled={!newTask.taskName}
              style={styles.actionBtn}
            >
              {i18n.t('taskDialog.newTask.submit')}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const makeStyles = (theme: AppTheme) => StyleSheet.create({
  dialog: {
    backgroundColor: theme.colors.card,
    borderRadius: 20,
  },
  dialogTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
  },
  container: {
    alignItems: 'center',
    gap: 12,
  },
  input: {
    width: '100%',
    backgroundColor: theme.colors.inputBackground,
    fontSize: 15,
  },
  inputOutline: {
    borderRadius: 12,
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
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  createBtnPending: {
    backgroundColor: theme.colors.buttonDisabled,
    borderColor: theme.colors.buttonDisabled,
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