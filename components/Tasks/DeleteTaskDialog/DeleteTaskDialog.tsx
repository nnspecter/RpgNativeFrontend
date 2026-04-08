import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Dialog, IconButton, Portal, Text, useTheme } from 'react-native-paper';
import { Task } from '../../../api/axios/apiTypes';
import { useDelTask } from '../../../api/mutations/mutations';
import i18n from '../../../i18n';
import { AppTheme } from '../../../theme/paperTheme';

export default function DeleteTaskDialog({ task }: { task: Task }) {
  const theme = useTheme<AppTheme>();
  const [visible, setVisible] = useState(false);
  const delTaskMutation = useDelTask();

  const hideDialog = () => setVisible(false);

  const handleDelete = () => {
    if (task.taskId) delTaskMutation.mutate(task.taskId);
    hideDialog();
  };

  const styles = makeStyles(theme);

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
          <Dialog.Title style={styles.dialogTitle}>{i18n.t('taskDialog.deleteTask.title')}</Dialog.Title>

          <Dialog.Content style={styles.content}>
            <Text style={{ color: theme.colors.onSurface }}>
              {i18n.t('taskDialog.deleteTask.confirm', { name: task.taskName })}
            </Text>
          </Dialog.Content>

          <Dialog.Actions style={styles.actions}>
            <Button onPress={hideDialog} textColor={theme.colors.secondary}>
              {i18n.t('taskDialog.cancel')}
            </Button>
            <Button
              mode="contained"
              onPress={handleDelete}
              buttonColor={theme.colors.error}
              style={styles.actionBtn}
            >
              {i18n.t('taskDialog.deleteTask.submit')}
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