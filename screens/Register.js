import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Layout, Input, Button} from '@ui-kitten/components';
import Firebase, {db} from '../config/Firebase';

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordSecond, setPasswordSecond] = useState('');
  const [user, setUser] = useState({});

  const handleRegister = async () => {
    try {
      const response = await Firebase.auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      if (response.user.uid) {
        setUser({
          uid: response.user.uid,
          email: email,
        });
      }
      db.collection('users').doc(response.user.uid).set(user);
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
        placeholder="Name"
        value={name}
        onChangeText={(e) => setName(e)}
      />
      <Input
        style={styles.input}
        status="success"
        placeholder="Surname"
        value={surname}
        onChangeText={(e) => setSurname(e)}
      />
      <Input
        style={styles.input}
        status="success"
        placeholder="Password"
        value={password}
        onChangeText={(e) => setPassword(e)}
        secureTextEntry={true}
      />
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
      <Input
        style={styles.input}
        status="success"
        placeholder="Password (Again)"
        value={passwordSecond}
        onChangeText={(e) => setPasswordSecond(e)}
        secureTextEntry={true}
      />
      <Button
        style={styles.button}
        status="basic"
        onPress={() => handleRegister()}>
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

export default Register;
