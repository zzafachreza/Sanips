import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
  ImageBackground,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { MyButton, MyGap, MyInput, MyInputLogin } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth, Color } from '../../utils';
import { MYAPP, apiURL, api_token, getData, storeData } from '../../utils/localStorage';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { color } from 'react-native-reanimated';
import axios from 'axios';
import MyLoading from '../../components/MyLoading';
import { useToast } from 'react-native-toast-notifications';

export default function Login({ navigation, route }) {
  const [loading, setLoading] = useState(false)
  const img = new Animated.Value(0.8);
  const card = new Animated.Value(50);
  const toast = useToast();
  const masuk = () => {
    if (kirim.email.length == 0 && kirim.length == 0) {
      toast.show('Email dan kata sandi tidak boleh kosong', { type: 'warning' })

    } else if (kirim.email.length == 0) {
      toast.show('Email tidak boleh kosong', { type: 'warning' })
    } else if (kirim.password.length == 0) {
      toast.show('Kata sandi tidak boleh kosong', { type: 'warning' })
    } else {
      setLoading(true);
      console.log(kirim);
      axios.post(apiURL + 'login', kirim)
        .then(res => {
          setLoading(false);
          console.log(res.data);
          if (res.data.status == 404) {
            toast.show(res.data.message, { type: 'danger' })
          } else {
            storeData('user', res.data.data);
            navigation.replace('MainApp')
          }
        });
    }
  }

  const [kirim, setKirim] = useState({
    api_token: api_token,
    email: '',
    password: '',
  })

  const [comp, setComp] = useState({})

  useEffect(() => {

    Animated.timing(img, {
      toValue: 1,
      duration: 750,
      useNativeDriver: true,
    }).start();
    Animated.timing(card, {
      toValue: 1,
      duration: 750,
      useNativeDriver: true,
    }).start();
    axios.post(apiURL + 'company').then(res => {
      setComp(res.data.data);
    })
  }, []);

  return (
    <SafeAreaView style={{
      flex: 1,
      width: '100%',
      height: '100%',
      padding: 0,
      margin: 0

    }}
    >

      <ImageBackground style={{
        flex: 1,
        width: '100%',
        height: '100%',
      }} source={require('../../assets/bglogin.png')}>

        <ScrollView>

          <View style={{
            padding: 10
          }}>
            <View style={{
              alignItems: 'center',
              marginTop: '30%'
            }}>

              <Image style={{
                width: 286,
                height: 380,

              }} source={require('../../assets/logosplash.png')} />
            </View>


            <View style={{
              padding: 30,
              marginTop: -30
            }}>
              {/* FORM VIEW */}

              {/* Email */}
              <MyInput placeholder="Email" onChangeText={x => setKirim({ ...kirim, email: x })} />


              {/* Pasword */}
              <MyInput secureTextEntry={true} placeholder="Password" onChangeText={x => setKirim({ ...kirim, password: x })} />

              {/* Button */}
              <MyGap jarak={10} />
              <MyButton title="Masuk" onPress={masuk} />

              {/* Button Daftar */}
              <MyGap jarak={10} />
              <TouchableWithoutFeedback onPress={() => navigation.navigate('Register')}>
                <View style={{ padding: 10 }}>
                  <Text style={{
                    fontFamily: fonts.primary[500],
                    textAlign: "center",
                    color: colors.primary,
                    fontSize: 13

                  }}>Belum punya akun? Silakan <Text style={{
                    fontWeight: 'bold'
                  }}>daftar</Text></Text>
                </View>
              </TouchableWithoutFeedback>


            </View>

          </View>

        </ScrollView>


      </ImageBackground>

    </ SafeAreaView>
  );
}

const styles = StyleSheet.create({});
