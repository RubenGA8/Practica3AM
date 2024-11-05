import React, { useState, useEffect, useContext } from 'react';
import {Link, router} from 'expo-router'
import { StyleSheet, Text, View, Button, Image, Pressable, TouchableOpacity } from 'react-native';
import { Camera, CameraView, CameraCapturedPicture, CameraType, useCameraPermissions } from 'expo-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MyContext } from "./context";
import { endpoints } from "@/constants/endpoints";

export default function Index() {
    
    const [cameraRef, setCameraRef] = useState<CameraView | null>(null);
    const [isPreview, setIsPreview] = useState(false);
    const [capturedImage, setCapturedImage] = useState<CameraCapturedPicture | undefined>(undefined);
    const [facing, setFacing] = useState<CameraType>('front');
    const [permission, requestPermission] = useCameraPermissions();

    const {loginData}= useContext(MyContext);
    
    if(!permission){
        return <View/>
    }

    if(!permission.granted){
        return(
            <View style={styles.container}>
                <Text>Se requiere permiso para mostrar la cámara</Text>
                <Pressable onPress={requestPermission}><Text>Dar permiso</Text></Pressable>
            </View>
        )
    }

    function toggleCameraFacing(){
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const takePicture = async () => {
        console.log('foto1');
        if (cameraRef) {
            console.log('foto2');
            try {
                const photo = await cameraRef.takePictureAsync({ base64: true });
                setIsPreview(true);
                setCapturedImage(photo);
                console.log('foto3');
                //console.log(photo);
                const form = new FormData();
                form.append('token', 'code37');
                form.append('id', loginData.id);
                form.append('pfp_picture', photo?.uri);
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

            } catch (error) {
                console.error('Error taking picture:', error);
            }
        }
        console.log('foto4');
    };

    const retakePicture = () => {
        setCapturedImage(undefined);
        setIsPreview(false);
    };

    // const uploadImage = async () => {
    //     if (capturedImage) {
    //         try {
    //             const response = await fetch(capturedImage.uri);
    //             const blob = await response.blob();

    //             // Create a FormData object and append parameters
    //             const formData = new FormData();
    //             formData.append('token', 'code37');
    //             formData.append('id', user.id); // Replace userId with the actual user ID

    //             // Append the blob with a filename
    //             formData.append('image', blob, 'profile_pic.jpg');

    //             const uploadResponse = await fetch(API.registro, {
    //                 method: 'POST',
    //                 body: formData,
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                 },
    //             });

    //             if (uploadResponse.ok) {
    //                 const responseData = await uploadResponse.json();
    //                 Alert.alert('Success', 'Profile picture updated successfully.');
    //                 console.log('Response:', responseData);
    //                 // Update user context or navigate
    //                 setUser({ ...user, pfp_url: responseData.url });
    //                 router.back();

    //             } else {
    //                 const errorData = await uploadResponse.json();
    //                 Alert.alert('Error', errorData.error || 'Failed to update profile picture.');
    //             }
    //         } catch (error) {
    //             console.error('Error uploading image:', error);
    //             Alert.alert('Error', 'An error occurred while uploading the image.');
    //         }
    //     } else {
    //         Alert.alert('No Image', 'Please capture an image before uploading.');
    //     }
    // };

    return(
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} ref={setCameraRef}>
                <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                    <Text style={styles.text}>Flip Camera</Text>
                </TouchableOpacity>
                </View>
            </CameraView>
            <Pressable style={styles.botonconlogo}>
                <Icon
                    name='save'
                    size={20}
                    color='#000'
                />
                <Text style={styles.textoboton} onPress={takePicture}>
                    Guardar
                </Text>
            </Pressable>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
    },
    camera:{
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
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
        backgroundColor:'#F9D689',
			flexDirection:'row',
			alignItems: 'center',
			justifyContent: 'center',
			padding:5,
            right:5,
			borderRadius:5,
			borderColor:'#000',
			borderWidth:2,
			width:100,
			height:40
    },
    textoboton:
    {
        paddingLeft:5
    },
})