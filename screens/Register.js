import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Layout, Input, Button, Icon, CheckBox} from '@ui-kitten/components';
import Firebase, {db} from '../config/Firebase';
import data from '../data/Countries';

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordSecond, setPasswordSecond] = useState('');
  const [user, setUser] = useState({});
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneModalVisible, setPhoneModalVisible] = useState(false);
  const [readTerms, setReadTerms] = useState(false);
  const [flag, setFlag] = useState(
    data[0].filter((country) => country.name === 'Turkey')[0].flag,
  );

  const renderPhoneIcon = (props) => {
    const countryData = data;
    return (
      <>
        <TouchableWithoutFeedback>
          <Icon {...props} name="phone-outline" />
        </TouchableWithoutFeedback>
        <View>
          <Text>{flag}</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => setPhoneModalVisible(true)}>
          <Icon {...props} name="arrow-down-outline" />
        </TouchableWithoutFeedback>
        <Modal
          animationType="slide"
          transparent={false}
          visible={phoneModalVisible}>
          <View style={{flex: 1}}>
            <View style={{flex: 7, marginTop: 80}}>
              <FlatList
                data={countryData[0]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setFlag(item.flag);
                      setPhoneNumber(item.dial_code);
                      setPhoneModalVisible(false);
                    }}>
                    <View style={styles.countryStyle}>
                      <Text style={styles.textStyle}>
                        {item.flag} {item.name} ({item.dial_code})
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                )}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                setPhoneModalVisible(false);
              }}
              style={styles.closeButtonStyle}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </>
    );
  };

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
      db.collection('users').doc(response.user.uid).set({
        name: name,
        surname: surname,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
      });
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
      <Input
        style={styles.input}
        status="success"
        placeholder="+901111111122"
        value={phoneNumber}
        onChangeText={(val) =>
          setPhoneNumber(phoneNumber === '' ? `+90${val}` : val)
        }
        keyboardType={'phone-pad'}
        returnKeyType="done"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={false}
        accessoryLeft={renderPhoneIcon}
      />
      <CheckBox
        checked={readTerms}
        onChange={(nextChecked) => setReadTerms(nextChecked)}>
        <Text>I have read and accept the Terms and Conditions</Text>
      </CheckBox>
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
  textStyle: {
    padding: 5,
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  countryStyle: {
    flex: 1,
    backgroundColor: 'rgba(34, 43, 69, 1)',
    borderTopColor: '#303860',
    borderTopWidth: 1,
    padding: 12,
  },
  closeButtonStyle: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#b44666',
  },
});

export default Register;
