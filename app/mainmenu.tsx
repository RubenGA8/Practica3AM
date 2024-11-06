//Pantalla de mainmenu de pruebas 
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {Link, router} from 'expo-router'
import { useState, useContext } from 'react'
import { MyContext } from "./context";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Index()
{
    const {loginData}= useContext(MyContext);

    function onButtonEdit(){
        router.navigate('/camera')
    }

    function onButtonLogout(){
        router.replace('/');
    }

    return(
        <View style={styles.container}>

            <View style={styles.profile} >
                <Text>Welcome back {loginData.firstname}</Text>
                <Pressable onPress={onButtonEdit}>
                    <Image style={styles.pfp_image} source={{uri:loginData.pfp_url}}></Image>
                </Pressable>
                <Text>{loginData.email}</Text>
                <Text>Clave de usuario: {loginData.id}</Text>
                <Text>Tus creditos: {loginData.credits}</Text>
                <Text>Tu xp: {loginData.xp}</Text>
            </View>
            <View style={styles.credits}>
                <Link href="/credits">
                    <Text>Made with 💗 by Ingen.</Text>
                </Link>
            </View>
            <Pressable style={styles.logout} onPress={onButtonLogout}>
                <Link href='/'>
                    <Text>Logout</Text>
                </Link>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container:{
            flex: 1,
            justifyContent:'center',
            alignItems: 'center',
        },
        pfp_image:{
            height:260,
            width:260,
            borderRadius:5,
        },
        profile:{
            backgroundColor:'#a2c7d7',
            width:300,
            height:375,
            padding:10,
        },
        credits:{
            position:'absolute',
            bottom:50,
            backgroundColor:'#27a542',
            padding:10,
        },
        logout:{
            position:'absolute',
            bottom:5,
            backgroundColor:'#c93223',
            padding:10
        },
        edit:{
            position:'absolute',
            top:20,
            right:20,
        }
    }
)