import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useSnacbarControlStore } from '../../ZustandStore/snackbarControlStore';

const AfterCompleteSnackbar = () => {
  const { isVisible, setVisible } = useSnacbarControlStore();

  const onDismissSnackBar = () => setVisible(false);

  React.useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <View style={styles.container}>
      <Snackbar
        visible={isVisible}
        onDismiss={onDismissSnackBar}
        duration={3000}>
        Задача успешно завершена!
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default AfterCompleteSnackbar;