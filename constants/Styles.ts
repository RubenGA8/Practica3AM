import { Image,StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Estilos = StyleSheet.create(
    {
        Principal:{
            flex: 1,
            //backgroundColor: "#faf3e7",
            width: width,
            height: height,
        },

        ImagenFondo:{
            flex: 1,
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
            /*justifyContent: "center",*/
            alignItems: "center",
            fontWeight: "black",
        },

        Contenedor3v2:{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "black",
            zIndex:3,
        },

        ContenedorCajaDeTexto:{
            flexDirection:'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            width:'60%',
            marginTop: 10,
            marginBottom: 10,
            fontFamily: "JoylineNotes",
        },

        ContenedorMargenizadoSupInf:{
            marginTop: 15,
            marginBottom: 10,
            textAlign: "center",
            flexDirection:'row',
            alignItems: 'center',
            justifyContent: 'center',
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

        TextoComun:{
            //fontFamily: "JoylineNotes",
            fontSize: 18,
        },

        TextoBotones:{
            color: "#ffffff",
            fontSize: 15,
            fontWeight: "bold",
            letterSpacing: 1,
        },

        CajasDeTexto:{
            borderRadius: 12,
            borderColor: "#40175a",
            borderWidth: 2,
            height: height/22,
            width: width/2,
        },

        Icono:{
            color: "#61135a",
            fontSize: 35,
            margin: 10,
        },

        Placeholders:{
            marginLeft: 5,
            fontStyle: "italic",
        },

        Botones:{
            backgroundColor:'#d94acd',
            flexDirection:'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            borderColor: "#000000",
            borderWidth: 2,
            padding: "2%",
            width: width/3.5,
        },

        Imagen:{
            resizeMethod: "scale",
            height: height/5,
            width: width/1.5,

        },

        ImagenPerfil:{
            height:width/1.75,
            width:width/1.75,
            borderRadius:5,
        },

        Opacidades:{
            shadowColor: "#000000",
            shadowOpacity: 0.95,
            shadowOffset: {width: 1, height: 10},
            shadowRadius: 10,
        },

        Error:{
            color:"#F00",
            padding:5,
        },

        IconoTexto:{
            color: "#61135a",
            fontSize: 20,
            margin: 5,
        },

        Link:{
            backgroundColor:'#d94acd',
            flexDirection:'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            borderColor: "#000000",
            borderWidth: 2,
            padding: "2%",
            paddingHorizontal: "4.5%",
            margin: "2%",
            width: width/3.65,
        },

        Camara:{
            height:height/4,
            width:width/1.85,
        },

        BotonRotarCamara:{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: 'transparent',
            margin: "5%",
        },

        BotonTransparente:{
            flex: 1,
            alignSelf: 'flex-end',
            alignItems: 'center',
        },
    }
)