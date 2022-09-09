import React, { useState } from 'react';
import auth from '@react-native-firebase/auth'


import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Alert } from 'react-native';

export function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSignInAnonymously(){
    const { user } = await auth().signInAnonymously();
  }

  function handleCreateUserAccount(){
    auth().createUserWithEmailAndPassword(email,password)
    .then(() => {
      Alert.alert('Usuario criado com sucesso')
    }).catch(error => {
      if(error.code === "auth/email-already-in-use"){
        Alert.alert('Este e-mail já está em uso')
      }

      if(error.code === 'auth/invalid-email'){
        Alert.alert('E-mail inválido')
      }

      if(error.code === 'auth/weak-password'){
        Alert.alert('A senha deve ter ao menos 6 dígitos')

      }
    })

  }

  function handleLoginWithEmailAndPassword() {
    auth()
      .signInWithEmailAndPassword(email,password)
      .then(({user}) => {

      }).catch(error => {
        if(error.code === 'auth/user-not-found' || error.code === "auth/wrong-password"){
          Alert.alert('Usuário não encontrado. E-mail e/ou Senha inválido')
        }
      })

  }

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input
        placeholder="senha"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={() => { }} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleLoginWithEmailAndPassword} />
        {/* {Apenas didatico, nao foi desenvolvido tela para criacao de conta} */}
        <ButtonText title="Criar minha conta" onPress={handleCreateUserAccount} />
      </Account>
    </Container>
  );
}