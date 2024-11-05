import { Text, View, StyleSheet, TextInput, Pressable, Button} from "react-native";
import { useFonts } from "expo-font";
import IconRocket from './iconrocket';
import IconRobot from './robot';
import { endpoints } from "@/constants/endpoints";
import { useState, useContext } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

import { Estilos } from "@/constants/Styles";

import * as Crypto from 'expo-crypto'
import {Link, router} from "expo-router"
//importar el componente de Context
import { MyContext } from "./context";

//https://docs.expo.dev/develop/user-interface/fonts/
//https://reactsvgicons.com/react-svg-icons-guide

export default function Index() {

	const [loaded, error] = useFonts({
		'poppins': require('../assets/fonts/PoppinsSemiBold.ttf'),
	  });

	const [fontsLoaded] = useFonts({
		'MiguelDeNorthern': require("../assets/fonts/MiguelDeNorthern.ttf"),
	});

	//[nombre de la variable, nombre de la funcion que modifica la variable]
	const [userValue, setUserValue] = useState('');
	const [passValue, setPassValue] = useState('');
	const [failedLogin, setFailedLogin] = useState(false);
	const {loginData, setLoginData} = useContext(MyContext);

	const onButtonLogin = async ()=>{
		console.log("Loging int");
		//Hacer la petición del loging

		const digest = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256,passValue);

		const form = new FormData();
		form.append('token', 'code37');
		form.append('user', userValue);
		form.append('pass', digest);
		fetch( endpoints.LOGIN, {
			method: 'POST',
			body: form
		})
		.then( response=>response.json())
		.then( data => {
			if(!data.error && data.id){
				console.log("Login exitoso");
				console.log(data);
				setLoginData(data);
				router.replace('/mainmenu');//ir a pantalla mainmenu sin posibilidad de regresar
				//user399 - quesillo
			}
			else{
				setFailedLogin(true);
			}
		})
		.catch( err=>{console.log(err)});
	}

  return (
	<View style={Estilos.Principal}>
		<View style={Estilos.Contenedor1}>
			<Text style={Estilos.Titulos}>Ingen</Text>
			<Text style={Estilos.Subtitulos}>¡Te da la bienvenida!</Text>
		</View>

		<View style={Estilos.Contenedor2}>
			<View style={Estilos.ContenedorCajaDeTexto}>
				<Icon
					name='user'
					style={Estilos.Icono}
				/>
				<TextInput style={Estilos.CajasDeTexto} onChangeText={setUserValue} placeholder="Usuario"></TextInput>
			</View>
			<View style={styles.inputfieldlabel}>
				<Icon
					name='lock'
					size={20}
					color='#000'
				/>
				<TextInput style={styles.input} secureTextEntry onChangeText={setPassValue} placeholder="Contraseña"></TextInput>
			</View>
			{failedLogin? (<Text style={styles.error}>Usuario o contraseña incorrectos.</Text>):undefined}
		</View>

		<View style={Estilos.Contenedor3}>
			<Pressable style={styles.botonconlogo} onPress={onButtonLogin} >
				<Text>Log in!</Text>
			</Pressable>

			<Text >¿No tienes una cuenta?</Text>

			<Link href='/register' asChild>
				<Pressable style={styles.botonconlogo}>
					<Text>Regístrate.</Text>
				</Pressable>
			</Link>
		</View>

		{/*<Link href="/mainmenu" asChild>
			<Button title="Main"></Button>
		</Link>*/}

    </View>
	
  );
}

const styles=StyleSheet.create(
	{
		container:{
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
		},
		title:{
			fontSize:44
		},
		inputfieldlabel:
		{
			flexDirection:'row',
			alignItems: 'center',
			justifyContent: 'flex-end',
			width:'60%'
		},
		input: {
			height: 40,
			width:150,
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
		error:{
			color:"#F00",
			padding:5,
		},
		//#973131 #E0A75E #F9D689 #F5E7B2
		
	}
)