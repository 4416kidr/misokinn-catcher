import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Footer from "./components/footer/footer";
import Review  from './components/review/review';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello, World</Text>
      <StatusBar style="auto" />
      <Review />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'space-between', // フッターを下部に表示
  },
});
