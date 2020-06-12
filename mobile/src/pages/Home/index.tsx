import React ,{ useState, useEffect}from 'react';
import {Feather as Icon} from '@expo/vector-icons';
import {Platform, KeyboardAvoidingView, View, ImageBackground, Image, Text, StyleSheet, Alert} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {Picker} from '@react-native-community/picker';

interface IBGEUfResponse{
  sigla: string;
}

interface IBGECityResponse {
  nome:string;
}

const Home = () => {
  const [uf, setUf] = useState<string[]>([]);
  const [city, setCity] = useState<string[]>([]);
  const navigation = useNavigation();

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  useEffect (() =>{
    axios.get<IBGEUfResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response =>{
      const ufInitials = response.data.map(uf => uf.sigla);
      setUf(ufInitials);
    });
  }, []);


  useEffect(() => {
    if(selectedUf ==='0'){
      return;
    }
    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response =>{
      const cityNames = response.data.map(city => city.nome);
      setCity(cityNames);
    });
  }, [selectedUf]);

  function handleNavigationToPoints(){
    //navigation.navigate('Points', {uf, city});
      if (selectedUf === '0' || selectedCity === '0'){
        Alert.alert('Ops...', ' Selecione o estado e a cidade.');
      } else {
        navigation.navigate('Points', { uf: selectedUf, city: selectedCity });
      }
  };

    return(
      <KeyboardAvoidingView
        behavior={Platform.OS ==='ios' ? 'padding': undefined}
        style={{flex: 1}}
      >
        <ImageBackground 
        source={require('../../assets/home-background.png')} 
        style={styles.container}
        imageStyle={{width: 274, height: 368}}>
            <View style={styles.main}>
                <Image source={require('../../assets/logo.png')}/>
                  <View>
                    <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
                    <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
                  </View>
            </View>

            <View style={styles.footer}>
              
              <Picker
                selectedValue={selectedUf}
                onValueChange={(uf) =>
                  setSelectedUf(String(uf))
                }>
                  <Picker.Item label="Selecione um Estado" value='0' />
                  { uf.map(uf => (
                    <Picker.Item key={uf} label={uf} value={uf} />
                   ))}
              </Picker>

              <Picker
                selectedValue={selectedCity}
                onValueChange={(city) =>
                  setSelectedCity(String(city))
                }>
                  <Picker.Item label="Selecione uma Cidade" value='0' />
                  { city.map(city => (
                    <Picker.Item key={city} label={city} value={city} />
                    ))}
                   
              </Picker>

                <RectButton style={styles.button} onPress={handleNavigationToPoints}>
                    <View style={styles.buttonIcon}>
                        <Text>
                            <Icon name="arrow-right" color="#FFF" size={24}/>
                        </Text>
                    </View>
                    <Text style={styles.buttonText}>
                        Entrar
                    </Text>
                </RectButton>
            </View>

        </ImageBackground>
      </KeyboardAvoidingView>

    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 64,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {},
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
  });

export default Home;