import React, { useState, useEffect } from 'react';
import { Alert, View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Camera as ExpoCamera } from 'expo-camera';

interface Props {
    onCloseCamera: () => void;
    onTakePicture: (newPhoto: string) => void;
}

const Camera: React.FC<Props> = ({ onCloseCamera, onTakePicture }) => {
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [type, setType] = useState(ExpoCamera.Constants.Type.back);
    const [camera, setCamera] = useState<ExpoCamera>();

    useEffect(() => {
        (async () => {
            const { status } = await ExpoCamera.requestCameraPermissionsAsync();
            setHasPermission(status == 'granted');
        })();
    }, []);

    const onFlipPress = () => {
        setType(type === ExpoCamera.Constants.Type.back ? ExpoCamera.Constants.Type.front : ExpoCamera.Constants.Type.back);
    };

    const onTakePicturePress = async () => {
        try {
            if (camera) {
                const { uri } = await camera.takePictureAsync({
                    quality: 0.5
                });
                onTakePicture(uri);
            }
        } catch (err) {
            console.log(err);
            Alert.alert('Erro', 'Houve um erro ao tirar a foto.');
        }
    };
    return (
        <ExpoCamera style={{ flex: 1 }} type={type} ref={(ref: ExpoCamera) => setCamera(ref)}>
            <View style={styles.actionsButtons}>
                <TouchableOpacity onPress={onFlipPress}>
                    <Text style={styles.flipText}>Flip</Text>
                </TouchableOpacity>
                <Icon name="close" size={50} color="#FFF" onPress={onCloseCamera} />
            </View>
            <TouchableOpacity style={styles.takePictureButton} onPress={onTakePicturePress}>
                <Icon name="photo-camera" size={50} color="#FFF" />
            </TouchableOpacity>
        </ExpoCamera>
    );
};
const styles = StyleSheet.create({
    actionsButtons: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5
    },
    flipText: {
        fontSize: 18,
        color: '#FFF'
    },
    takePictureButton: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 5
    }
});
export default Camera;
