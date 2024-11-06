import React, { useState, useEffect, useContext } from 'react';
import { Link, router } from 'expo-router'
import { StyleSheet, Text, View, Button, Pressable, TouchableOpacity, Platform } from 'react-native';
import { Camera, CameraView, CameraCapturedPicture, CameraType, useCameraPermissions } from 'expo-camera';
import { FontAwesome, MaterialCommunityIcons, } from 'react-native-vector-icons';
import { MyContext } from "./context";
import { endpoints } from "@/constants/endpoints";
import { Image } from 'expo-image'
import * as MediaLibrary from 'expo-media-library';


export default function Index() {

    const [cameraRef, setCameraRef] = useState<CameraView | null>(null);
    const [preview, setPreview] = useState(false);
    const [capturedImage, setCapturedImage] = useState<CameraCapturedPicture | undefined>(undefined);
    const [facing, setFacing] = useState<CameraType>('front');
    const [permission, requestPermission] = useCameraPermissions();

    const { loginData } = useContext(MyContext);

    if (!permission) {
        return <View />
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text>Se requiere permiso para mostrar la cámara</Text>
                <Pressable onPress={requestPermission}><Text>Dar permiso</Text></Pressable>
            </View>
        )
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    function togglePreview() {
        setPreview(current => (current === true ? false : true));
    }

    const takePicture = async () => {
        if (cameraRef) {
            try {
                const photo = await cameraRef.takePictureAsync({ base64: true });
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
            //await MediaLibrary.saveToLibraryAsync(capturedImage.uri);
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
                        router.replace('/mainmenu');
                    } else {
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

    return (
        <View style={styles.container}>
            {preview && capturedImage ? (//Preview
                <View>
                    <Image style={styles.pfp_image} source={capturedImage.uri}>

                    </Image>
                    <Pressable style={styles.botonconlogo} onPress={togglePreview}>
                        <MaterialCommunityIcons
                            name='camera-retake-outline'
                            size={20}
                            color='#000'
                        />
                    </Pressable>
                    <Pressable style={styles.botonconlogo}>
                        <FontAwesome
                            name='save'
                            size={20}
                            color='#000'
                        />
                        <Text style={styles.textoboton} onPress={savePicture}>
                            Guardar foto
                        </Text>
                    </Pressable>
                </View>
            ) ://Take picture
                <View>
                    <CameraView style={styles.camera} facing={facing} ref={setCameraRef} ratio='1:1'>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                                <FontAwesome
                                    name='refresh'
                                    size={20}
                                    color='#fff'
                                />
                            </TouchableOpacity>
                        </View>
                    </CameraView>
                    <Pressable style={styles.botonconlogo}>
                        <FontAwesome
                            name='camera'
                            size={20}
                            color='#000'
                        />
                        <Text style={styles.textoboton} onPress={takePicture}>
                            Tomar foto
                        </Text>
                    </Pressable>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        height: 200,
        width: 200,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 15,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    botonconlogo:
    {
        backgroundColor: '#F9D689',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        right: 5,
        borderRadius: 5,
        borderColor: '#000',
        borderWidth: 2,
        width: 100,
        height: 40
    },
    textoboton:
    {
        paddingLeft: 5
    },
    pfp_image: {
        height: 260,
        width: 260,
        borderRadius: 5,
    },
})