import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, Text, FlatList, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

export default function UsersList({ navigation }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading to true on component mount

  useEffect(() => {
    /*const subscriber = firestore
      .collection('Users')
      .onSnapshot(querySnapshot => {
        const users = [];
  
        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
  
        setUsers(users);
        setLoading(false);
      });
  
    // Unsubscribe from events when no longer in use
    return () => subscriber();*/
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text>User ID: {item.id}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
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
    alignItems:'center',
    height: 50,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
});
