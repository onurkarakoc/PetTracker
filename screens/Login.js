import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Layout, Input, Button} from '@ui-kitten/components';
import Firebase from '../config/Firebase';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});

  const handleLogin = async () => {
    try {
      const response = await Firebase.auth().signInWithEmailAndPassword(
        email,
        password,
      );
      setUser(response);
      navigation.navigate('Home');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Input
        style={styles.input}
        status="success"
        placeholder="E-mail"
        value={email}
        onChangeText={(e) => setEmail(e)}
        autoCapitalize="none"
      />
      <Input
        style={styles.input}
        status="success"
        placeholder="Password"
        value={password}
        onChangeText={(e) => setPassword(e)}
        secureTextEntry={true}
      />
      <Button
        style={styles.button}
        status="basic"
        onPress={() => handleLogin()}>
        Login
      </Button>
      <Button
        style={styles.button}
        status="basic"
        onPress={() => navigation.navigate('Register')}>
        Register
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 10,
  },
  button: {
    margin: 25,
    width: 300,
  },
});

export default Login;
