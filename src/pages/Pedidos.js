
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import firebase from '../../firebase';

export default function Views(navigation) {
  const [name, setName] = useState('');
  const [pedidos, setPedidos] = useState('');
  const [listFire, setListFire] = useState('');

  function createFirebase() {
    var database = firebase.database();
    try {
      database.ref('/pedidos').push({
        name: name,
        pedidos: pedidos,
      });

    } catch (e) {
      alert(e)
    }
    finally {
      setName('');
      setPedidos('');
    }
  }
  
  // Metodo para listar
  useEffect(() => {
    var database = firebase.database();
    try {
      database.ref('/pedidos').on('value', (snapshot) => {
        const list = [];
        snapshot.forEach((childItem) => {
          list.push({
            key: childItem.key,
            name: childItem.val().name,
            pedidos: childItem.val().pedidos,
          });
        });
        setListFire(list);
      })

    } catch (e) {
      alert(e)
    }
  }, [])

  function delFire(key) {
    var database = firebase.database();
    database.ref('/pedidos/' + key).remove();
  }

  return (
    <View style={styles.container}>

      <FlatList style={styles.viewFlalist} data={listFire}
        keyExtractior={(item) => item.key}
        renderItem={({ item }) =>

          <View style={styles.iconFlat}>

            <Text style={styles.nometext}>Nome:  {item.name}</Text>
            <Text style={styles.pedidostext}>Pedidos:  {item.pedidos}</Text>

            <TouchableOpacity style={styles.btnDelete} onPress={() => { delFire(item.key) }}>
              <Text style={styles.text}>Delete</Text>
            </TouchableOpacity>

          </View>
        }
      ></FlatList>

      <TextInput style={styles.nomeInput}
        onChangeText={name => setName(name)} value={name}
        placeholder="Nome" />

      <TextInput style={styles.pedidosInput}
        onChangeText={pedidos => setPedidos(pedidos)} value={pedidos}
        placeholder="Faça aqui seus pedidos! " />

      <TouchableOpacity style={styles.btnEnviar} onPress={createFirebase}>
        <Text style={styles.text}>Enviar</Text>
      </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nometext: {
    color: '#fff',
  },
  pedidostext: {
    color: '#fff',
  },
  text: {
    color: '#fff',
  },
  nomeInput: {
    width: 300,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 2,
    textAlign: 'center',
    marginTop: 20,
  },
  pedidosInput: {
    width: 300,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 2,
    textAlign: 'center',
    marginTop: 5,
  },
  btnEnviar: {
    margin: 10,
    borderWidth: 1,
    width: 150,
    height: 50,
    
    alignItems: 'center',
    justifyContent: 'center'

  },
  iconFlat: {
    width: 300,
    height: 120,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  btnDelete: {
    borderWidth: 1,
    borderColor: 'red',
    width: 50,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    marginTop: 40
  },
  viewFlat: {
    maxHeight: 410,
  }
});
