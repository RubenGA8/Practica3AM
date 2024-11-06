import {View, Text, Image, StyleSheet, TextInput, Button, Pressable, ImageBackground} from 'react-native';
import {FontAwesomeIcon, faEnvelopeOpenText} from "react-native-vector-icons";

import { endpoints } from '@/constants/endpoints';
import { Estilos } from "@/constants/Styles";

import {router, Link} from 'expo-router';
import { useState, useContext } from 'react'
import * as Crypto from 'expo-crypto'
import IconRobot from './robot';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icono from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconos from 'react-native-vector-icons/MaterialIcons';

export default function Index()
{

    const [userValue, setUserValue] = useState('');
    const [idValue, setIdValue] = useState('');
    const [passValue, setPassValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [lastnameValue, setlastnameValue] = useState('');
    const [mailValue, setMailValue] = useState('');
    const [failedRegister, setFailedRegister] = useState(false);

    const onButtonRegister = async ()=>{
        console.log('Register int');

        const digest = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, passValue);

        const form = new FormData();
        form.append('token', 'code37');
        form.append('id', idValue);
        form.append('username', userValue);
        form.append('pass', digest);
        form.append('firstname', nameValue);
        form.append('lastname', lastnameValue);
        form.append('email', mailValue);
        console.log(form);

        fetch(endpoints.REGISTER, {
            method: 'POST',
            body: form
        })
        .then(response=>response.json())
        .then(data=>{
            if(!data.error && data.id){
                console.log('Registro exitoso');
                console.log(data);
                router.replace('/');
            }
            else{
                console.log(data.error);
                setFailedRegister(true);
            }
        })
    }

    return(
        <View style={Estilos.Principal}>
            <ImageBackground source={require('../assets/images/BackGroundRegistro.png')} resizeMode="cover" style={Estilos.ImagenFondo}>
            <View style={Estilos.Contenedor1}>
                <Text style={Estilos.Titulos}>
                    Registrarse
                </Text>
            </View>

            <View style={Estilos.Contenedor2}>
                <View style={Estilos.ContenedorCajaDeTexto}>
                    <Icon name="key" style={Estilos.Icono}/>
                    <TextInput style={Estilos.CajasDeTexto} onChangeText={setIdValue} placeholder="  ID"></TextInput>
                </View>

                <View style={Estilos.ContenedorCajaDeTexto}>
                    <Icon name="user-circle-o" style={Estilos.Icono}/>
                    <TextInput style={Estilos.CajasDeTexto} onChangeText={setUserValue} placeholder="  Usuario"></TextInput>
                </View>

                <View style={Estilos.ContenedorCajaDeTexto}>
                    <Iconos name="lock-person" style={Estilos.Icono}/>
                    <TextInput style={Estilos.CajasDeTexto} secureTextEntry onChangeText={setPassValue} placeholder="  Contraseña"></TextInput>
                </View>

                <View style={Estilos.ContenedorCajaDeTexto}>
                    <Iconos name="person" style={Estilos.Icono}/>
                    <TextInput style={Estilos.CajasDeTexto} onChangeText={setNameValue} placeholder="  Nombre"></TextInput>
                </View>

                <View style={Estilos.ContenedorCajaDeTexto}>
                    <Iconos name="person" style={Estilos.Icono}/>
                    <TextInput style={Estilos.CajasDeTexto} onChangeText={setlastnameValue} placeholder="  Apellido"></TextInput>
                </View>

                <View style={Estilos.ContenedorCajaDeTexto}>
                    <Icono name="email" style={Estilos.Icono}/>
                    <TextInput style={Estilos.CajasDeTexto} onChangeText={setMailValue} placeholder="  Email"></TextInput>
                </View>
            </View>

            <View style={Estilos.Contenedor3v2}>
                {failedRegister? (<Text style={Estilos.Error}>Error al registrar el usuario</Text>):undefined}
                <Pressable style={Estilos.Botones} onPress={onButtonRegister}>
                    <Text style={Estilos.TextoBotones}>Registrar</Text>
                </Pressable>
            </View>
            </ImageBackground>
        </View>
    )
}