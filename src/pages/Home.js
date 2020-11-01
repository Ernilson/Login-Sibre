import React, { useState, useEffect } from 'react';
import { View, StatusBar, Image, FlatList, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Header, Left, Body, Button, Title, Text, Icon } from 'native-base';
import { useTheme } from '@react-navigation/native';
import Swiper from 'react-native-swiper/src';
import firebase from '../../firebase';
import { WebView } from 'react-native-webview';

class CustomHeader extends React.Component {
  render() {
    let { title, isHome } = this.props
    return (
      <Header>
        <Left>
          {
            isHome ?
              <Button transparent>
                <Icon name='menu'  />
              </Button> :
              <Button transparent >
                <Icon name='menu' />
              </Button>
          }
        </Left>
        <Body>
          <Title>{title}</Title>
        </Body>
      </Header>
    )
  }
}

function Feed() {
  const theme = useTheme();
  return (
    <View style={{ flex: 0.4, backgroundColor: 'transparent' }}>
      <CustomHeader />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <Text> Oh gloria !</Text>

        <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />

        <View style={{ height: 200, width: '90%', alignSelf: 'center', borderRadius: 8, justifyContent: 'center' }}>
          <Swiper autoplay height={200}>

            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'transparent', borderRadius: 8 }}>
              <Image source={require('../../assets/images/img001.png')}
                resizeMode="cover"
                style={{ height: '100%', width: '100%', alignSelf: 'center', borderRadius: 8 }}
              />
            </View>

            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'transparent', borderRadius: 8 }}>
              <Image source={require('../../assets/images/img002.png')}
                resizeMode="cover"
                style={{ height: '100%', width: '100%', alignSelf: 'center', borderRadius: 8 }}
              />
            </View>

            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'transparent', borderRadius: 8 }}>
              <Image source={require('../../assets/images/img011.png')}
                resizeMode="cover"
                style={{ height: '100%', width: '100%', alignSelf: 'center', borderRadius: 8 }}
              />
            </View>
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'transparent', borderRadius: 8 }}>
              <Image source={require('../../assets/images/img008.png')}
                resizeMode="cover"
                style={{ height: '100%', width: '100%', alignSelf: 'center', borderRadius: 8 }}
              />
            </View>
          </Swiper>
        </View>
      </View>
    </View>
  )

}

class Notifications extends React.Component {
  render() {
   // const [url, setUrl] = useState('');
  //  const [go, setGo] = useState(false);
   
  
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ flex: 1, justifyContent: 'center' }}>

          <WebView source={{ uri: 'https://www.youtube.com/channel/UCWTywd1HwBLG3mpSI5hAmvg/videos' }} />

      </View>
  </View>

    )
  }
}

function Profile() {
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

  const styles = StyleSheet;

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>

        <Text style={{ justifyContent: 'center', alignItems: 'center' }}> Oh gloria !</Text>

        <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />

        <View style={{ height: 200, width: '90%', alignSelf: 'center', borderRadius: 8, justifyContent: 'center' }}>
          <Swiper autoplay height={200}>

            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#000', borderRadius: 8 }}>
              <Image source={require('../../assets/food-banner1.png')}
                resizeMode="cover"
                style={{ height: '100%', width: '100%', alignSelf: 'center', borderRadius: 8 }}
              />
            </View>

            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#000', borderRadius: 8 }}>
              <Image source={require('../../assets/food-banner2.png')}
                resizeMode="cover"
                style={{ height: '100%', width: '100%', alignSelf: 'center', borderRadius: 8 }}
              />
            </View>

            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#000', borderRadius: 8 }}>
              <Image source={require('../../assets/food-banner3.jpg')}
                resizeMode="cover"
                style={{ height: '100%', width: '100%', alignSelf: 'center', borderRadius: 8 }}
              />
            </View>
          </Swiper>
        </View>

        <FlatList style={styles.viewFlalist} data={listFire}
          keyExtractior={(item) => item.key}
          renderItem={({ item }) =>
            <View style={{ width: 350, height: 120, borderColor: '#fff', borderWidth: 1, borderRadius: 5, alignItems: 'center', justifyContent: 'center', margin: 5 }}>
              <Text style={{ color: '#fff' }}>Nome: {item.name}</Text>
              <Text style={{ color: '#fff' }}>Pedidos: {item.pedidos}</Text>
            </View>
          }
        ></FlatList>
      </View>
    </View>
  )

}

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#e91e63"
      labelStyle={{ fontSize: 12 }}
      style={{ backgroundColor: 'tomato' }}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'Eventos',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Cantina',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="food" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Home() {
  return (
    <NavigationContainer >
      <MyTabs />
    </NavigationContainer>
  );
}

