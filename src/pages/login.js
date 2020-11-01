import React, { useState, useEffect } from 'react';
import {
  View, Text, KeyboardAvoidingView, TextInput,
  TouchableOpacity, StyleSheet, Animated
} from 'react-native';
import firebase from '../../firebase';


export default function App({navigation}) {
   
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Metodo para validar usuarios autenticados
  function loginFirebase() {
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => navigation.navigate('Home'))   
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorCode, errorMessage)
    
    });
  }

  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 15 }))
  const [logo] = useState(new Animated.ValueXY({ x: 250, y: 220 }))

  
  useEffect(() => {
    Animated.spring(offset.y, {
      toValue: 0,
      speed: 4,
      bounciness: 40
    }).start();
  }, [])


  
    useEffect(() => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          console.log("Logado - " + user.email)
        } else {
          console.log('Não há usuario com este email');
        }
      });
    }, [])
    
  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Animated.Image
          style={{
            width: logo.x,
            height: logo.y
          }}
          source={require('../../assets/logo.png')}
        />
        <Text>Deus Seja Louvado</Text>
      </View>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              { translateY: offset.y }
            ]
          }
        ]}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(email) => setEmail(email)} value={email}
        />

        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Senha"
          autoCapitalize="none"
          onChangeText={(password) => setPassword(password)} value={password}
        />

        <TouchableOpacity style={styles.btnSubmit} onPress={() => { loginFirebase() }}>
          <Text style={styles.textLogin}>login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnRegister}onPress={() => navigation.navigate('cadastro')}>
          <Text style={styles.btnRegisterText}>Criar conta gratuita</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  containerLogo: {
    flex: 1,
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  input: {
    backgroundColor: '#FFF',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },
  btnSubmit: {
    marginTop: 20,
    backgroundColor: '#35AAFF',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  submitText: {
    color: '#FFF',
    fontSize: 18,
  },
  btnRegister: {
    marginTop: 10,
  },
  btnRegisterText: {
    color: '#FFF',
  },
  textLogin: {
    color: '#000',
    fontSize: 21,
  },


});

