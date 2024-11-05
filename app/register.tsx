import {View, Text, Image, StyleSheet, TextInput, Button, Pressable} from 'react-native';
import { endpoints } from '@/constants/endpoints';
import {router, Link} from 'expo-router';
import { useState, useContext } from 'react'
import * as Crypto from 'expo-crypto'
import IconRobot from './robot';

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
        <View style={styles.container}>
            <Text style={styles.title}>
                Registrarse
            </Text>
            <View style={styles.inputfieldlabel}>
                <Text>ID</Text>
                <TextInput style={styles.input} onChangeText={setIdValue}></TextInput>
            </View>
            <View style={styles.inputfieldlabel}>
                <Text>Usuario</Text>
                <TextInput style={styles.input} onChangeText={setUserValue}></TextInput>
            </View>
            <View style={styles.inputfieldlabel}>
                <Text>Contraseña</Text>
                <TextInput style={styles.input} secureTextEntry onChangeText={setPassValue}></TextInput>
            </View>
            <View style={styles.inputfieldlabel}>
                <Text>Nombre</Text>
                <TextInput style={styles.input} onChangeText={setNameValue}></TextInput>
            </View>
            <View style={styles.inputfieldlabel}>
                <Text>Apellido</Text>
                <TextInput style={styles.input} onChangeText={setlastnameValue}></TextInput>
            </View>
            <View style={styles.inputfieldlabel}>
                <Text>Email</Text>
                <TextInput style={styles.input} onChangeText={setMailValue}></TextInput>
            </View>
            {failedRegister? (<Text style={styles.error}>Error al registrar el usuario</Text>):undefined}
            <Pressable style={styles.botonconlogo} onPress={onButtonRegister}>
                <Text>Register</Text>
            </Pressable>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputfieldlabel:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
        width:'60%',
    },
    input:{
        height: 40,
        width: 150,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    botonconlogo:
    {
        backgroundColor:'#F9D689',
			flexDirection:'row',
			alignItems: 'center',
			justifyContent: 'center',
			padding:5,
			borderRadius:5,
			borderColor:'#000',
			borderWidth:2,
			width:100,
			height:40
    },
    title:
    {
        fontSize: 44,
        bottom: 15,
    },
    error:{
        color:"#F00",
        padding:5,
    },
})