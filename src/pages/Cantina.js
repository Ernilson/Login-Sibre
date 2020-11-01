import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, FlatList,TouchableOpacity  } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Swiper from 'react-native-swiper/src';
import firebase from '../../firebase';

export default function Cantina({navigation}) {
    const [listFire, setListFire] = useState('');

    const theme = useTheme();

    // Metodo para listar
    useEffect(() => {
        var database = firebase.database();
        try {
            database.ref('/pedidos').on('value', (snapshot) => {
                const list = [];
                snapshot.forEach((childItem) => {
                    list.push({
                        key: childItem.key,
                        name: childItem.val().name,
                        pedidos: childItem.val().pedidos,
                    });
                });
                setListFire(list);
            })

        } catch (e) {
            alert(e)
        }
    }, [])

    return (

        <View style={styles.container}>
            <Text style={styles.tamanho}> Oh gloria !</Text>
            <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
            
            <View style={styles.sliderContainer}>
                <Swiper autoplay height={200}>
                    <View style={styles.slide}>

                        <Image source={require('../../assets/food-banner1.png')}
                            resizeMode="cover"
                            style={styles.sliderImage}
                        />
                    </View>

                    <View style={styles.slide}>
                        <Image source={require('../../assets/food-banner2.png')}
                            resizeMode="cover"
                            style={styles.sliderImage}
                        />
                    </View>

                    <View style={styles.slide}>
                        <Image source={require('../../assets/food-banner3.jpg')}
                            resizeMode="cover"
                            style={styles.sliderImage}
                        />
                    </View>
                </Swiper>
            </View>

            <FlatList style={styles.viewFlalist} data={listFire}
                keyExtractior={(item) => item.key}
                renderItem={({ item }) =>

                    <View style={styles.iconFlat}>

                        <Text style={styles.nometext}>Nome:  {item.name}</Text>
                        <Text style={styles.pedidostext}>Pedidos:  {item.pedidos}</Text>

                    </View>
                }
            ></FlatList>
            <View>
                <TouchableOpacity style={styles.btnSubmit} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.textLogin}>Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 0,
        backgroundColor: '#000',
    },
    sliderContainer: {
        height: 200,
        width: '90%',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 8,
    },
    iconFlat: {
        width: 350,
        height: 120,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
    btnSubmit: {
        marginTop: 20,
        backgroundColor: '#35AAFF',
        width: '90%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
      },
    nometext: {
        color: '#fff',
    },
    pedidostext: {
        color: '#fff',
    },
    wrapper: {},

    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 8,
    },
    sliderImage: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
    },
    categoryContainer: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 10,
    },
    categoryBtn: {
        flex: 1,
        width: '30%',
        marginHorizontal: 0,
        alignSelf: 'center',
    },
    categoryIcon: {
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 70,
        height: 70,
        backgroundColor: '#fdeae7' /* '#FF6347' */,
        borderRadius: 50,
    },
    categoryBtnTxt: {
        alignSelf: 'center',
        marginTop: 5,
        color: '#de4f35',
    },
    cardsWrapper: {
        marginTop: 20,
        width: '90%',
        alignSelf: 'center',
    },
    card: {
        height: 100,
        marginVertical: 10,
        flexDirection: 'row',
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    cardImgWrapper: {
        flex: 1,
    },
    cardImg: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
    },
    cardInfo: {
        flex: 2,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: '#fff',
    },
    cardTitle: {
        fontWeight: 'bold',
    },
    cardDetails: {
        fontSize: 12,
        color: '#444',
    },
    tamanho: {
        fontSize: 0
    }
});


