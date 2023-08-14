import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';

export default function Register() {
  const [userRegister, setUserRegister] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    CPF: '',
  });
  console.log(userRegister);
  return (
    <View style={styles.container}>
      <Animatable.View
        animation={'fadeInLeft'}
        delay={500}
        style={styles.containerHeader}>
        <Text style={styles.message}>Bem Vindo!</Text>
      </Animatable.View>
      <Animatable.View animation={'fadeInUp'} style={styles.containerForm}>
        <Text style={styles.title}>Nome</Text>
        <TextInput
          placeholder="Digite seu nome..."
          style={styles.input}
          onChangeText={text => setUserRegister({...userRegister, name: text})}
        />

        <Text style={styles.title}>Email</Text>
        <TextInput
          placeholder="Digite seu email..."
          style={styles.input}
          onChangeText={text => setUserRegister({...userRegister, email: text})}
        />

        <Text style={styles.title}>Senha</Text>
        <TextInput
          placeholder="Digite sua senha..."
          style={styles.input}
          onChangeText={text =>
            setUserRegister({...userRegister, password: text})
          }
        />

        <Text style={styles.title}>Telefone</Text>
        <TextInput
          placeholder="Digite sua telefone..."
          style={styles.input}
          onChangeText={text => setUserRegister({...userRegister, phone: text})}
        />

        <Text style={styles.title}>CPF</Text>
        <TextInput
          placeholder="Digite um CPF válido..."
          style={styles.input}
          onChangeText={text => setUserRegister({...userRegister, CPF: text})}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            const response = await axios.post(
              'https://delivery-app-bvcm.onrender.com/api/v1/users/',
              {
                ...userRegister,
                companyId: '64c482528ec04f42b867a542',
              },
            );
            console.log(response.data);
          }}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
  },
  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%',
  },
  message: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  containerForm: {
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  title: {
    fontSize: 20,
    marginTop: 28,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#38a69d',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: 'center',
  },
  registerText: {
    color: '#a1a1a1',
  },
});
