import React, { useState, useEffect, useContext } from 'react';
import {Link, router} from 'expo-router'
import {StyleSheet, Text, View, Button, Pressable, TouchableOpacity, ImageBackground} from 'react-native';
import { Camera, CameraView, CameraCapturedPicture, CameraType, useCameraPermissions } from 'expo-camera';
import {FontAwesome, MaterialCommunityIcons} from 'react-native-vector-icons';
import { MyContext } from "./context";
import { endpoints } from "@/constants/endpoints";
import {Image} from 'expo-image'
import {Estilos} from "@/constants/Styles";

export default function Index() {
    
    const [cameraRef, setCameraRef] = useState<CameraView | null>(null);
    const [preview, setPreview] = useState(false);
    const [capturedImage, setCapturedImage] = useState<CameraCapturedPicture | undefined>(undefined);
    const [facing, setFacing] = useState<CameraType>('front');
    const [permission, requestPermission] = useCameraPermissions();

    const {loginData}= useContext(MyContext);
    
    if(!permission){
        return <View/>
    }

    if(!permission.granted){
        return(
            <View style={Estilos.Principal}>
                <Text style={Estilos.TextoComun}>Se requiere permiso para mostrar la cámara</Text>
                <Pressable style={Estilos.Botones} onPress={requestPermission}><Text>Dar permiso</Text></Pressable>
            </View>
        )
    }

    function toggleCameraFacing(){
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }
    
    function togglePreview(){
        setPreview(current => (current === true ? false : true));
    }

    const takePicture = async () => {
        if (cameraRef) {
            try {
                const photo = await cameraRef.takePictureAsync({ base64: true });
                setPreview(true);
                setCapturedImage(photo);
            } catch (error) {
                console.error('Error taking picture:', error);
            }
        }
    };

    const savePicture = () => {
        const form = new FormData();
        if(capturedImage){
            form.append('token', 'code37');
            form.append('id', loginData.id);
            form.append('image', capturedImage?.uri);
            console.log(form);
            
            fetch(endpoints.SET_PROFILE_PICTURE, {
                method:'POST',
                body:form,
            })
            .then(response=>response.json())
            .then(data => {
                if(!data.error && data.id){
                    console.log('Cambio de imagen exitoso');
                    console.log(data);
                    router.replace('/mainmenu');
                }else{
                    console.log('error al cambiar la foto de perfil');
                    console.log(data.error);
                }
            })
            .catch(err=>{console.log(err)});
        }
    }

    const retakePicture = () => {
        setCapturedImage(undefined);
        setPreview(false);
    };

    return(
        <View style={Estilos.Principal}>
            <ImageBackground source={require('../assets/images/BackGroundCamera.png')} resizeMode="cover" style={Estilos.ImagenFondo}>
            {preview && capturedImage? (//Preview
                <View style={Estilos.Contenedor1}>
                    <Image style={Estilos.ImagenPerfil} source={capturedImage.uri}></Image>

                    <View style={Estilos.ContenedorMargenizadoSupInf}>
                        <Pressable style={Estilos.Botones} onPress={togglePreview}>
                            <MaterialCommunityIcons
                                name='camera-retake-outline'
                                style={Estilos.IconoTexto}
                            />
                            <Text style={Estilos.TextoBotones} onPress={savePicture}>Retomar</Text>
                        </Pressable>
                    </View>

                    <View style={Estilos.ContenedorMargenizadoSupInf}>
                    <Pressable style={Estilos.Botones}>
                        <FontAwesome
                            name='save'
                            style={Estilos.IconoTexto}
                        />
                        <Text style={Estilos.TextoBotones} onPress={savePicture}>Guardar</Text>
                    </Pressable>
                    </View>
                </View>
            )://Take picture
                <View style={Estilos.Contenedor1}>
                    <CameraView style={Estilos.Camara} facing={facing} ref={setCameraRef} ratio='1:1'>
                        <View style={Estilos.BotonRotarCamara}>
                        <TouchableOpacity style={Estilos.BotonTransparente} onPress={toggleCameraFacing}>
                            <FontAwesome
                                name='refresh'
                                size={20}
                                color='#fff'
                            />
                        </TouchableOpacity>
                        </View>
                    </CameraView>
                    <Pressable style={Estilos.Link}>
                        <FontAwesome
                            name='camera'
                            style={Estilos.IconoTexto}
                        />

                        <Text style={Estilos.TextoBotones} onPress={takePicture}>Tomar foto</Text>
                    </Pressable>
                </View>
            }
            </ImageBackground>
        </View>
    )
}