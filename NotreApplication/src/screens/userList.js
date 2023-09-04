import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, Text, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { IconButton, Title } from 'react-native-paper';
import { firestore } from '../firebase';
import { collection, getDocs } from "firebase/firestore";

export default function UsersList({ navigation }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading to true on component mount

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        //const db = getFirestore(firestore); // Initialisez Firestore
        const userCol = collection(firestore, 'Utilisateurs'); // Créez la référence à la collection
        const querySnapshot = await getDocs(userCol); // Récupérez les données des utilisateurs

        const usersData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));

        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/ia.gif')} // Remplacez par le chemin de votre fichier GIF
        style={styles.backgroundImage}>
        <View style={styles.buttonContainer}>       
          <Title style={styles.titleText}>VisiaScan Users List</Title>
          <FlatList
            data={users}
            contentContainerStyle={styles.listContainer} 
            renderItem={({ item }) => (
              <View style={styles.userItem}>
                <Text style={styles.userText}>User ID: {item.id}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
          <IconButton
            icon='keyboard-backspace'
            size={30}
            style={styles.navButton}
            iconColor='white'
            onPress={() => navigation.goBack()}
          />
        </View>
      </ImageBackground>
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
  userText: {
    color: 'white', // Couleur du texte en blanc
    fontSize: 16, // Ajustez la taille du texte selon vos préférences
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
    color:'white'
  },
  listContainer: {
    flex: 1,
    alignItems: 'center', // Centre les éléments horizontalement
    justifyContent: 'center', // Centre les éléments verticalement
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Vous pouvez ajuster le mode de redimensionnement selon vos besoins
    justifyContent: 'center', // Vous pouvez ajuster l'alignement vertical selon vos besoins
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center', // Centre les boutons horizontalement
    alignItems: 'center', // Centre les boutons verticalement
  },
});
