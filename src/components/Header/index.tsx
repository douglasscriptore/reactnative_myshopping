import React from 'react';
import auth from '@react-native-firebase/auth'

import { ButtonIcon } from '../ButtonIcon';

import { Container, Title } from './styles';

type Props = {
  title: string;
  showLogoutButton?: boolean;
}

function handleLogout() {
  auth().signOut()
}

export function Header({ title, showLogoutButton = false }: Props) {
  return (
    <Container showLogoutButton={showLogoutButton}>
      <Title>
        {title}
      </Title>

      {
        showLogoutButton &&
        <ButtonIcon
          icon="logout"
          color="alert"
          style={{ marginTop: 20 }}
          onPress={handleLogout}
        />
      }
    </Container>
  );
}
