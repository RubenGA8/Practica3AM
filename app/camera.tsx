import React, { useState, useEffect, useContext } from 'react';
import {Link, router} from 'expo-router'
import {StyleSheet, Text, View, Button, Pressable, TouchableOpacity, ImageBackground, Platform} from 'react-native';
import { Camera, CameraView, CameraCapturedPicture, CameraType, useCameraPermissions } from 'expo-camera';
import { FontAwesome, MaterialCommunityIcons, } from 'react-native-vector-icons';
import { MyContext } from "./context";
import { endpoints } from "@/constants/endpoints";
import {Image} from 'expo-image'
import {Estilos} from "@/constants/Styles";
import * as MediaLibrary from 'expo-media-library';

export default function Index() {

    const [cameraRef, setCameraRef] = useState<CameraView | null>(null);
    const [preview, setPreview] = useState(false);
    const [capturedImage, setCapturedImage] = useState<CameraCapturedPicture | undefined>(undefined);
    const [facing, setFacing] = useState<CameraType>('front');
    const [permission, requestPermission] = useCameraPermissions();
    const [failedSave, setFailedSave] = useState(false);
    const {loginData, setLoginData} = useContext(MyContext);

    if (!permission) {
        return <View />
    }

    if(!permission.granted){
        return(
            <View style={Estilos.Principal}>
                <ImageBackground source={require('../assets/images/BackGroundCamera.png')} resizeMode="cover" style={Estilos.ImagenFondo}>
                    <View style={Estilos.Contenedor1}>
                        <Text style={Estilos.TextoComun}>Se requiere permiso para mostrar la cámara</Text>
                        <Pressable style={Estilos.Botones} onPress={requestPermission}><Text>Dar permiso</Text></Pressable>
                    </View>
                </ImageBackground>
            </View>
        )
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }
    
    function toggleFailedSave() {
        setFailedSave(current => (current === false ? true : false));
    }
    
    function togglePreview() {
        setPreview(current => (current === true ? false : true));
    }

    const takePicture = async () => {
        if (cameraRef) {
            try {
                const photo = await cameraRef.takePictureAsync({ imageType:'jpg', quality:0 });
                setPreview(true);
                console.log(photo?.uri);
                setCapturedImage(photo);
            } catch (error) {
                console.error('Error taking picture:', error);
            }
        }
    };
    
    const savePicture = async() => {
        const form = new FormData();
        if (capturedImage) {
            await MediaLibrary.saveToLibraryAsync(capturedImage.uri);
            form.append('token', 'code37');
            form.append('id', loginData.id);
            
            form.append('image', {
                uri: capturedImage.uri,
                name: 'image',
                type: 'image/jpg'
            });
            
            // form.append('image', capturedImage?.uri);
            console.log(form);
            
            fetch(endpoints.SET_PROFILE_PICTURE, {
                method: 'POST',
                body: form,
            })
                .then(response => response.json())
                .then(data => {
                    if (!data.error && data.id) {
                        console.log('Cambio de imagen exitoso');
                        console.log(data);
                        const userInfo = loginData;
                        // console.log(userInfo);
                        userInfo['pfp_url'] = capturedImage.uri;
                        // console.log(userInfo);
                        setLoginData(userInfo);
                        router.replace('/mainmenu');
                    } else {
                        toggleFailedSave();
                        console.log('error al cambiar la foto de perfil');
                        console.log(data);
                    }
                })
                .catch(err => { console.log(err) });
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
                            <Text style={Estilos.TextoBotones}>Retomar</Text>
                        </Pressable>
                    </View>

                    <View style={Estilos.ContenedorMargenizadoSupInf}>
                    <Pressable style={Estilos.Botones} onPress={savePicture}>
                        <FontAwesome
                            name='save'
                            style={Estilos.IconoTexto}
                        />
                        <Text style={Estilos.TextoBotones}>Guardar</Text>
                    </Pressable>
                    </View>
                    {failedSave? (<Text style={Estilos.Error}>Error al guardar la foto.</Text>):undefined}
                </View>
            )://Take picture
                <View style={Estilos.Contenedor1}>
                    <CameraView style={Estilos.Camara} facing={facing} ref={setCameraRef} ratio='1:1' pictureSize='640x480'>
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
                    <Pressable style={Estilos.Link} onPress={takePicture}>
                        <FontAwesome
                            name='camera'
                            style={Estilos.IconoTexto}
                        />

                        <Text style={Estilos.TextoBotones}>Tomar foto</Text>
                    </Pressable>
                </View>
            }
            </ImageBackground>
        </View>
    )}