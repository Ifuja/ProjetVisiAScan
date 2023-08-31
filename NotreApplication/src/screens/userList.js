import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

export default function UsersList({ navigation }) {
  const { users } = useState([]);

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => <Text style={styles.userItem}>{item.name}</Text>}
        keyExtractor={(item) => item.id.toString()}
      />
      <IconButton
        icon='keyboard-backspace'
        size={30}
        style={styles.navButton}
        iconColor='#5b3a70'
        onPress={() => navigation.goBack()}
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
