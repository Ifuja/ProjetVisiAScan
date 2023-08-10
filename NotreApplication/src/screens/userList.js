import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function UserList({ navigation }) {
  const { users } = useState([]);

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => <Text style={styles.userItem}>{item.name}</Text>}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  userItem: {
    fontSize: 18,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
});
