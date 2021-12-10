import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Constants from 'expo-constants';

import AsyncStorage from '@react-native-async-storage/async-storage';

import BookType from '../types/Book';
import NavigationProps from '../types/NavigationProps';

import Photo from '../components/Photo';
import Camera from '../components/Camera';

const Book: React.FC<NavigationProps> = ({ navigation }) => {
    const book = navigation.getParam('book', {
        title: '',
        description: '',
        read: false,
        photo: ''
    } as BookType);

    const isEdit = navigation.getParam('isEdit', false);

    const [books, setBooks] = useState<BookType[]>([]);
    const [title, setTitle] = useState<string>(book.title);
    const [description, setDescription] = useState<string>(book.description);
    const [photo, setPhoto] = useState<string | null>(book.photo);
    const [read, setRead] = useState<boolean>(book.read);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    useEffect(() => {
        AsyncStorage.getItem('books').then((data) => {
            if (data) {
                const book = JSON.parse(data);
                setBooks(book);
            }
        });
    }, []);

    const isValid = () => {
        if (title !== undefined && title !== '') {
            return true;
        }

        return false;
    };

    const onCloseModal = () => {
        setIsModalVisible(false);
    };
    const onChangePhoto = (newPhoto: string | null) => {
        setPhoto(newPhoto);
    };

    const onSave = async () => {
        if (isValid()) {
            if (isEdit) {
                const newBooks = books;

                newBooks.map((item) => {
                    if (item.id == book.id) {
                        item.title = title;
                        item.description = description;
                        item.read = read;
                        item.photo = photo;
                    }
                    return item;
                });
                await AsyncStorage.setItem('books', JSON.stringify(newBooks));
                navigation.goBack();
            } else {
                const id = Math.ceil(1 + Math.random() * 5000).toString();
                const data = {
                    id,
                    title,
                    description,
                    photo
                } as BookType;

                books.push(data);

                await AsyncStorage.setItem('books', JSON.stringify(books));
                navigation.goBack();
            }
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inclua seu novo livro</Text>
            <TextInput value={title} onChangeText={(text: string) => setTitle(text)} style={styles.input} placeholder="Titulo" />
            <TextInput value={description} onChangeText={(text: string) => setDescription(text)} style={styles.input} placeholder="Descrição" multiline={true} numberOfLines={4} />
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.cameraButton}
                    onPress={() => {
                        setIsModalVisible(true);
                    }}
                >
                    <Icon name="photo-camera" size={18} color={'#fff'} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        if (isValid()) onSave();
                    }}
                    style={[styles.saveButton, isValid() ? {} : styles.saveButtonInvalid]}
                >
                    <Text style={styles.saveButtonText}>{isEdit ? 'Atualizar' : 'Cadastrar'}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <Modal animationType="slide" visible={isModalVisible}>
                    {photo ? <Photo photo={photo} onDeletePhoto={onChangePhoto} onClosePicture={onCloseModal} /> : <Camera onCloseCamera={onCloseModal} onTakePicture={onChangePhoto} />}
                </Modal>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        marginTop: Constants.statusBarHeight
    },
    buttonsContainer: {
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        color: '#3498db',
        textAlign: 'center',
        marginBottom: 20
    },
    input: {
        marginBottom: 10,
        fontSize: 16,
        borderBottomColor: '#f39c12',
        borderBottomWidth: 1
    },
    cameraButton: {
        backgroundColor: '#f39c12',
        borderRadius: 50,
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    saveButton: {
        backgroundColor: '#f39c12',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 20
    },
    saveButtonInvalid: {
        opacity: 0.5
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16
    },
    cancelButton: {},
    cancelButtonText: {
        color: '#95a5a6'
    }
});

export default Book;
