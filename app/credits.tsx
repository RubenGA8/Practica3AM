import {View, Text, Image, StyleSheet, Pressable, ImageBackground} from 'react-native';
import {Link, router} from 'expo-router';

import { Estilos } from "@/constants/Styles";

export default function Index()
{
    return(
        <View style={Estilos.Principal}>
            <ImageBackground source={require('../assets/images/BackGroundCreditos.png')} resizeMode="cover" style={Estilos.ImagenFondo}>
            <View style={Estilos.Contenedor1}>
                <Text style={Estilos.Titulos}>Ingen </Text>
                <Text style={Estilos.Subtitulos}>Creado y diseñado por: </Text>
            </View>

            <View style={Estilos.Contenedor2}>
                <Text style={Estilos.TextoComun}>Cervantes Figueroa, Angélica</Text>
                <Text style={Estilos.TextoComun}>García Aguilar, Rubén</Text>
                <Text style={Estilos.TextoComun}>Velázquez Cid, David</Text>
            </View>

            <View style={Estilos.Contenedor3v2}>
                <Link style={Estilos.Link} href="/mainmenu">
                    <Text style={Estilos.TextoBotones}>Regresar</Text>
                </Link>
            </View>
            </ImageBackground>
        </View>
    )
}