import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not found!!' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">This page does not exist... sorry</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText>
            Wanna go beck to
            <ThemedText type="link"> home screen</ThemedText>?
          </ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
