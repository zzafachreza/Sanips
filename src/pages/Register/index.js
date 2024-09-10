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
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyInputLogin, MyPicker, MyRadio } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth, Color } from '../../utils';
import { MYAPP, apiURL, api_token, getData, storeData } from '../../utils/localStorage';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { color } from 'react-native-reanimated';
import axios from 'axios';
import moment from 'moment';
import { useToast } from 'react-native-toast-notifications';
import MyLoading from '../../components/MyLoading';

export default function Register({ navigation, route }) {
    const [loading, setLoading] = useState(false)
    const img = new Animated.Value(0.8);
    const card = new Animated.Value(50);
    const toast = useToast();
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
    const [kirim, setKirim] = useState({
        api_token: api_token,
        nama_orangtua: '',
        nama_bayi: '',
        tanggal_lahir: moment().format('YYYY-MM-DD'),
        email: '',
        nomorhp:'',
        alamat: '',
        password: '',
        repassword: '',

    });

    const simpan = () => {



        if (
            kirim.nama_lengkap.length === 0 &&
            kirim.username.length === 0 &&
            kirim.password.length === 0

        ) {
            toast.show('Formulir pendaftaran tidak boleh kosong', {
                type: 'warning'
            })
        } else if (kirim.nama_lengkap.length === 0) {
            toast.show('Silahkan ketikan nama lengkap', {
                type: 'warning'
            })
        }

        else if (kirim.username.length === 0) {
            showMessage({
                message: 'Masukan username',
            });
        }
        else if (kirim.password.length === 0) {
            showMessage({
                message: 'Masukan kata sandi kamu',
            });
        } else if (kirim.repassword.length === 0) {
            showMessage({
                message: 'Ulangi kata sandi kamu',
            });
        } else {

            console.log(kirim);

            setLoading(true);
            axios
                .post(apiURL + 'register', kirim)
                .then(res => {
                    console.warn(res.data);
                    setLoading(false);
                    if (res.data.status == 404) {
                        toast.show(res.data.message, {
                            type: 'danger'
                        })

                    } else {
                        toast.show(res.data.message, {
                            type: 'success'
                        });
                        storeData('user', res.data.data);
                        navigation.replace('MainApp');

                    }


                });
        }
    };




    useEffect(() => {


        axios.post(apiURL + 'company').then(res => {
            setComp(res.data.data);
        })
    }, []);
    const [sama, setSama] = useState(true)

    const [usiaBayi, setUsiaBayi] = useState(0);

    
    // Fungsi untuk menghandle perubahan tanggal
    const handleTanggalLahirChange = (selectedDate) => {
        // Set tanggal lahir di state
        setKirim({ ...kirim, tanggal_lahir: selectedDate });

        // Hitung usia bayi berdasarkan tanggal yang dipilih
        const today = moment();
        const birthDate = moment(selectedDate);
        const usia = today.diff(birthDate, 'years');

        // Set usia bayi setelah tanggal dipilih
        setUsiaBayi(usia);
    };


    return (
        <SafeAreaView style={{
            flex: 1,
            width:'100%',
            height:'100%',
            backgroundColor:colors.white
        }}>
            {/* <MyHeader title="Daftar Akun" /> */}

            <ImageBackground source={require("../../assets/bgregister.png")} style={{
                flex:1,
                width:"100%",
                height:'100%',

            }}>


            <MyHeader title="Daftar"/>

            <ScrollView showsVerticalScrollIndicator={false}>

           

                <View style={{
                  padding:20,

                
                }}>

                {/* Nama Orang Tua/Wali */}
                <MyInput value={kirim.nama_orangtua} onChangeText={value => setKirim({...kirim,'nama_orangtua': value})} label="Nama Orang Tua/Wali" placeholder="Isi disini"/>

                    <MyGap jarak={20}/>

                  {/* Nama Bayi*/}
                  <MyInput value={kirim.nama_bayi } onChangeText={value => setKirim({...kirim,'nama_bayi': value})} label="Nama Bayi" placeholder="Isi disini"/>

                  
                    <MyGap jarak={20}/>

                  {/* Tanggal lahir Bayi*/}
                  <MyCalendar onDateChange={handleTanggalLahirChange}   value={kirim.tanggal_lahir} label="Tanggal Lahir Bayi"/>



                   {kirim.tanggal_lahir && (
                            <Text style={{fontSize: 13,
                            color:Color.blueGray[500],
                            textAlign:'left',
                            marginTop:10,
                            left:10,
                            fontFamily:fonts.primary[500]
                            }}>
                                Usia bayi saat ini:  {usiaBayi} tahun
                            </Text>
                        )}

                <MyGap jarak={20}/>

                  {/* Email*/}
                <MyInput onChangeText={value => setKirim({...kirim,'email': value})} value={kirim.email}  label="Email" placeholder="Isi disini"/>
                 
                <MyGap jarak={20}/>
                    {/* Nomor HP*/}
                <MyInput  onChangeText={value => setKirim({...kirim,'nomorhp': value})} value={kirim.nomorhp}  label="Nomor HP" placeholder="Isi disini"/>
                 
                <MyGap jarak={20}/>
                    {/* Alamat*/}
                <MyInput  onChangeText={value => setKirim({...kirim,'alamat': value})} value={kirim.alamat}  label="Alamat" placeholder="Isi disini"/>
                 
                <MyGap jarak={20}/>
                    {/* Buat Password*/}
                <MyInput  onChangeText={value => setKirim({...kirim,'password': value})} value={kirim.password}  label="Buat Password" placeholder="Isi disini" secureTextEntry='true'/>

                <MyGap jarak={20}/>
                    {/* Konfimasi Password*/}
                <MyInput onChangeText={value => setKirim({...kirim,'repassword': value})}  value={kirim.repassword}  label="Konfirmasi Password" placeholder="Isi disini" secureTextEntry='true'/>


                {/* Button */}
            <MyGap jarak={10}/>
            <MyButton title="Daftar"/>

            {/* Button Daftar */}
            <MyGap jarak={10}/>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Register')}>
              <View style={{padding:10}}>
                  <Text style={{
                    fontFamily:fonts.primary[500],
                    textAlign:"center",
                    color:colors.primary,
                    fontSize:13
                    
                  }}>Sudah punya akun? Silakan <Text style={{
                    fontWeight:'bold'
                  }}>masuk</Text></Text>
              </View>
            </TouchableWithoutFeedback>
                </View>


            </ScrollView>
            </ImageBackground>

        </SafeAreaView >
    );
}

const styles = StyleSheet.create({});
