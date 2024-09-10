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
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth, Color } from '../../utils';
import { MYAPP, apiURL, api_token, getData, storeData } from '../../utils/localStorage';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { color } from 'react-native-reanimated';
import axios from 'axios';
import moment from 'moment';
import { useToast } from 'react-native-toast-notifications';
import MyLoading from '../../components/MyLoading';
import MyCarouser from '../../components/MyCarouser';
import { Icon } from 'react-native-elements';


const MyMenu = ({ onPress, img, label, backgroundColor, desc }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth / 4,
        height: windowWidth / 4,
      }}>
        <View style={{
          backgroundColor: backgroundColor,
          borderRadius: 12,
          width: windowWidth / 4,
          height: windowWidth / 4,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center'

        }}>
          <Image source={img} style={{
            width: windowWidth / 5, height: windowWidth / 5,
          }} />
        </View>
        <Text style={{
          marginTop: 10,
          color: colors.black,
          ...fonts.caption,
          textAlign: 'center',
          maxWidth: '85%'
        }}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default function Home({ navigation, route }) {
  const [user, setUser] = useState({});

  const __getUser = () => {
    getData('user').then(u => {
      setUser(u)
    })
  }

  useEffect(() => {
    __getUser();
  }, [])
  return (
    <ImageBackground source={require('../../assets/homebg.png')} style={{
      flex: 1,
      backgroundColor: colors.white,
      width:"100%",
      height:"100%"
    }}>
    
    <ScrollView>


    {/* HEADER */}
    <View style={{padding:20, backgroundColor:colors.primary, borderBottomLeftRadius:50, borderBottomRightRadius:50,
      flexDirection:"row", justifyContent:'space-between', height:250, 
      }}>
      <View style={{
          marginTop:10
      }}>
      <Image style={{
        width:174,
        height:81,
      }} source={require('../../assets/sanips.png')}/>
      </View>
      
      <View style={{
        justifyContent:'center',
        alignItems:'center',
        top: -50
      }}>
      
          <View style={{

          }} >
            <Image style={{
              width:60,
              height:67, 
            }} source={require('../../assets/logohome.png')}/>
          </View>
     
      </View>


         
    </View>
    {/* END HEADERS */}

                <View style={{padding:10, }}>
                  {/* Sldier */}
                  
                  <View style={{alignItems:"center", marginTop: -130}}>
                    <MyCarouser/>
                  </View>

                  <MyGap jarak={5}/>

                    <View style={{marginTop:-40, padding:20,}}>
                    <View style={{flexDirection:"column", alignItems:'center'}}> 


                      <TouchableWithoutFeedback onPress={() => navigation.navigate('PenilaianNyeri')}>
                        <View style={{padding:10, backgroundColor:colors.secondary, borderRadius:50,
                          flexDirection:"row", justifyContent:"center", borderWidth:2,
                          borderColor:Color.blueGray[400], width:316, height:75,left:5
                        }}> 
                        
                        <View style={{
                          position:'absolute',
                          left: -20,
                          top: -10
                        }}>
                        <Image style={{
                            width:95,
                            height:95,
                          
                          }} source={require('../../assets/iconbayi.png')}/>

                        </View>
                          <Text style={{
                            fontFamily:fonts.primary[500],
                            fontSize:19,
                            color:colors.white, 
                            left:30,
                            top:-3
                            
                        
                         
                            

                          }}>Penilaian Nyeri pada{'\n'}
                            Bayi (0-6 Bulan)</Text>
                        </View>
                      </TouchableWithoutFeedback>

                    

                      <MyGap jarak={10}/>
                      
                    </View>
                    
                    </View>
       
                </View>

    </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({})