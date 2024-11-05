import {View, Text, Image, StyleSheet} from 'react-native';
import {router} from 'expo-router';

export default function Index()
{
    return(
        <View style={styles.container}>
            <Text>Ingen </Text>
            <Text>Cervantes Figueroa Angélica</Text>
            <Text>García Aguilar Rubén</Text>
            <Text>Velázquez Cid David</Text>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})