import { Text, View, StyleSheet } from 'react-native';
import { multiply ,multiply2} from '@nocanstillbb/minesweeper';
//import { multiply,multiply2 } from '@nocanstillbb/prism-rn';

const result = multiply2(3, 7);

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
