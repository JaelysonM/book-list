import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BookType from '../types/Book';
import NavigationProps from '../types/NavigationProps';

const Main: React.FC<NavigationProps> = ({ navigation }) => {
    const [books, setBooks] = useState<BookType[]>([]);

    useEffect(() => {
        AsyncStorage.getItem('books').then((data) => {
            if (data != null) {
                const book = JSON.parse(data);
                setBooks(book);
            }
        });
    }, []);
    const onNewBook = () => {
        navigation.navigate('Book');
    };

    const onBookRead = async (bookId: string) => {
        const newBooks = books.map((item) => {
            if (item.id == bookId) {
                item.read = !item.read;
            }
            return item;
        });
        await AsyncStorage.setItem('books', JSON.stringify(newBooks));
        setBooks(newBooks);
    };
    const onBookEdit = (bookId: string) => {
        const book = books.find((b) => b.id == bookId);

        if (book) {
            navigation.navigate('Book', {
                book: book,
                isEdit: true
            });
        }
    };

    const onBookDelete = async (bookId: string) => {
        const newBooks = books.filter((b) => b.id != bookId);
        await AsyncStorage.setItem('books', JSON.stringify(newBooks));
        setBooks(newBooks);
    };
    return (
        <View style={styles.container}>
            <View style={styles.toolbox}>
                <Text style={styles.title}>Lista de leitura</Text>
                <TouchableOpacity style={styles.toolboxButton} onPress={onNewBook}>
                    <Icon name="add" size={30} color="#fff"></Icon>
                </TouchableOpacity>
            </View>
            <FlatList
                data={books}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.itemsContainer}>
                            <TouchableOpacity style={styles.itemButton} onPress={() => onBookRead(item.id)}>
                                <Text style={[styles.itemText, item.read ? styles.itemTextRead : {}]}>{item.title}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.editButton} onPress={() => onBookEdit(item.id)}>
                                <Icon name="create" size={25} color="#2ecc71"></Icon>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteButton} onPress={() => onBookDelete(item.id)}>
                                <Icon name="delete" size={25} color="#e74c3c"></Icon>
                            </TouchableOpacity>
                        </View>
                    );
                }}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: Constants.statusBarHeight,
        backgroundColor: '#f0ee87'
    },
    toolbox: {
        flexDirection: 'row',
        marginBottom: 30,
        marginLeft: 30
    },
    title: {
        fontSize: 30,
        flex: 1,
        color: '#3498db'
    },
    toolboxButton: {
        backgroundColor: '#3498db',
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemButton: {
        flex: 1
    },
    itemsContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#d7dd75',
        marginLeft: 30
    },
    itemText: {
        fontSize: 26,
        color: '#000'
    },
    itemTextRead: {
        textDecorationLine: 'line-through',
        color: '#95a5a6'
    },
    editButton: {},
    deleteButton: {}
});

export default Main;
