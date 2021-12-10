import React from 'react';
import { View, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
    photo: string;
    onDeletePhoto: (photo: string | null) => void;
    onClosePicture: () => void;
}
const Photo: React.FC<Props> = ({ photo, onDeletePhoto, onClosePicture }) => {
    return (
        <ImageBackground
            source={{
                uri: photo
            }}
            style={styles.imagePreview}
        >
            <View style={styles.actionsButtons}>
                <Icon
                    name="delete"
                    size={50}
                    color="#FFF"
                    onPress={() => {
                        onDeletePhoto(null);
                    }}
                />
                <Icon name="check" size={50} color="#FFF" onPress={onClosePicture} />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: '100%'
    },
    actionsButtons: {
        flexDirection: 'row',
        marginRight: 5,
        marginLeft: 5,
        justifyContent: 'space-between'
    }
});
export default Photo;
