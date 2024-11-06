//Pantalla de mainmenu de pruebas 
import {View, Text, StyleSheet, Image, Pressable, ImageBackground} from 'react-native';
import {Link, router} from 'expo-router'
import { useState, useContext } from 'react'
import { MyContext } from "./context";
import Icon from 'react-native-vector-icons/FontAwesome';

import { Estilos } from "@/constants/Styles";

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
        <View style={Estilos.Principal}>
            <ImageBackground source={require('../assets/images/BackGroundMenuPrincipal.png')} resizeMode="cover" style={Estilos.ImagenFondo}>
            <View style={Estilos.Contenedor1}>
                <Text style={Estilos.Titulos}>Menú principal</Text>
            </View>

            <View style={Estilos.Contenedor2} >
                <Text style={Estilos.TextoComun}>Bienvenido de vuelta {loginData.firstname}</Text>

                <Pressable onPress={onButtonEdit}>
                    <Image style={Estilos.ImagenPerfil} source={{uri:loginData.pfp_url}}></Image>
                </Pressable>

                <Text style={Estilos.TextoComun}>{loginData.email}</Text>
                <Text style={Estilos.TextoComun}>Clave de usuario: {loginData.id}</Text>
                <Text style={Estilos.TextoComun}>Tus creditos: {loginData.credits}</Text>
                <Text style={Estilos.TextoComun}>Tu xp: {loginData.xp}</Text>
            </View>

            <View style={Estilos.Contenedor3v2}>

                <Link style={Estilos.Link} href="/credits">
                    <Text style={Estilos.TextoBotones}>Créditos</Text>
                </Link>

                <Link style={Estilos.Link} href='/'>
                    <Text style={Estilos.TextoBotones}>Logout</Text>
                </Link>
            </View>
            </ImageBackground>
        </View>
    )
}