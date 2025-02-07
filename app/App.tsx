import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RootRoutes from '../routes/root.routes';
export default function App() {
  return (
    <RootRoutes />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
