import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Estilos = StyleSheet.create(
    {
        Principal:{
            flex: 1,
            backgroundColor: "#faf3e7",
            width: width,
            height: height,
        },

        Contenedores:{
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "black",
        },

        Contenedor1:{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },

        Contenedor2:{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "black",
        },

        Contenedor3:{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "black",
        },

        ContenedorCajaDeTexto:{
            flexDirection:'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            width:'60%',
        },

        Titulos:{
            fontFamily: "MiguelDeNorthern",
            fontSize: 55,
            fontWeight:"bold",
        },

        Subtitulos:{
            fontFamily: "MiguelDeNorthern",
            fontStyle:"italic",
            fontSize: 25,
        },

        CajasDeTexto:{
            borderRadius: 10,
            borderColor: "#000000",
            borderWidth: 2,
            height: height/22,
            width: width/2,
        },

        Icono:{
            color: "#000000",
            fontSize: 35,
            margin: 10,
        }
    }
)