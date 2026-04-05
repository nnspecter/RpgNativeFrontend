import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { AuthData } from '../../api/axios/apiTypes';
import { useLogin } from '../../api/mutations/mutations';

const INPUT_WIDTH = 300;

export default function Login({ setter }: { setter: (type: "reg" | "login") => void }) {
  const theme = useTheme();
  const [loginData, setLoginData] = useState<AuthData>({
    username: "",
    password: ""
  });
  const [formError, setFormError] = useState<boolean>(false);
  const [secureText, setSecureText] = useState<boolean>(true);

  const loginMutation = useLogin();

  const handleClick = () => {
    if (loginMutation.isPending) return;

    if (loginData.username.trim().length < 4 || loginData.password.trim().length < 4) {
      setFormError(true);
      return;
    }

    setFormError(false);
    loginMutation.mutate(loginData);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.screen}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.screen}>
          <View style={styles.card}>

            {/* Иконка / аватар */}
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarIcon}>👤</Text>
            </View>

            {/* Заголовок */}
            <Text variant="headlineSmall" style={styles.title}>С возвращением</Text>
            <Text variant="bodyMedium" style={[styles.subtitle, { color: theme.colors.outline }]}>
              Войдите в свой аккаунт
            </Text>

            {/* Поля ввода */}
            <View style={styles.inputContainer}>
              <TextInput
                label="Логин"
                mode="outlined"
                left={<TextInput.Icon icon="account" />}
                value={loginData.username}
                error={formError}
                onChangeText={name => setLoginData(prev => ({ ...prev, username: name.trim().toLowerCase() }))}
                style={styles.input}
                outlineStyle={styles.inputOutline}
              />

              <TextInput
                label="Пароль"
                mode="outlined"
                secureTextEntry={secureText}
                left={<TextInput.Icon icon="lock" />}
                right={
                  <TextInput.Icon
                    icon={secureText ? "eye" : "eye-off"}
                    onPress={() => setSecureText(!secureText)}
                  />
                }
                value={loginData.password}
                error={formError}
                onChangeText={pass => setLoginData(prev => ({ ...prev, password: pass.trim() }))}
                style={styles.input}
                outlineStyle={styles.inputOutline}
              />
            </View>

            {/* Ошибка */}
            {(formError || loginMutation.error) && (
              <View style={styles.errorBox}>
                <Text variant="bodySmall" style={styles.errorText}>
                  {formError ? "Минимум 4 символа в полях" : "Неверный логин или пароль"}
                </Text>
              </View>
            )}

            {/* Кнопка входа */}
            <Button
              mode="contained"
              onPress={handleClick}
              loading={loginMutation.isPending}
              disabled={loginMutation.isPending}
              style={styles.button}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
            >
              Войти
            </Button>

            {/* Ссылка на регистрацию */}
            <View style={styles.footer}>
              <Text variant="bodyMedium" style={{ color: theme.colors.outline }}>Нет аккаунта?</Text>
              <Button
                mode="text"
                compact
                onPress={() => setter("reg")}
                labelStyle={styles.link}
              >
                Регистрация
              </Button>
            </View>

          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const INPUT_W = INPUT_WIDTH;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  card: {
    maxWidth: INPUT_W + 48,   // поля + горизонтальный padding 24 с каждой стороны
    paddingVertical: 36,
    paddingHorizontal: 24,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    // тень для iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    // тень для Android
    elevation: 4,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EEF0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarIcon: {
    fontSize: 28,
  },
  title: {
    fontWeight: '700',
    color: '#1C1B1F',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 28,
    textAlign: 'center',
  },
  inputContainer: {
    width: INPUT_W,
    gap: 14,
    marginBottom: 4,
  },
  input: {
    width: INPUT_W,
    backgroundColor: '#FAFAFA',
  },
  inputOutline: {
    borderRadius: 12,
  },
  errorBox: {
    width: INPUT_W,
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#FFEDEC',
  },
  errorText: {
    color: '#BA1A1A',
    textAlign: 'center',
  },
  button: {
    width: INPUT_W,
    marginTop: 20,
    borderRadius: 12,
  },
  buttonContent: {
    paddingVertical: 6,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  link: {
    fontWeight: '700',
    marginLeft: 2,
  },
});