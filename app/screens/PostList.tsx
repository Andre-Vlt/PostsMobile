import React, { useCallback, useState } from "react";
import { View, FlatList, Text, StyleSheet, Image } from "react-native";
import { Card, IconButton } from "react-native-paper";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { fetchPosts } from "../../functions/api/getPosts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatarData } from "../../functions/auxiliares/formatarData";

type StackParamList = {
    Login: undefined;
    PostList: undefined;
    CreatePost: undefined;
    EditarPost: undefined;
    LerPost: { id: string, title: string, content: string, date: string, subject: string, teacher: string };
}

export default function PostList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const navigation = useNavigation<StackNavigationProp<StackParamList>>();

    const loadPosts = async () => {
        try {
            setLoading(true);
            if (await AsyncStorage.getItem('isTeacher') === 'true') {
                setVisible(true);
            }
            const data = await fetchPosts();
            if (Array.isArray(data)) {
                const formattedPosts = data.map((post) => ({
                    id: post.id_post,
                    title: post.post_title,
                    date: formatarData(post.post_date),
                    subject: post.subject_name,
                    teacher: post.teacher_name,
                    post_text: post.post_text
                }));
                setPosts(formattedPosts);
            } else {
                console.error("Erro! A API não retornou um array!", data);
                setPosts([]);
            }
        } catch (error) {
            console.error("Erro ao buscar post: ", error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadPosts();
        }, [])
    );

    return (
        <View style={styles.container}>
            {/* Topo com logo à esquerda e nome do aluno à direita */}
            <View style={styles.header}>
                <Image source={require('../../assets/images/Books.png')} style={styles.logo} />
                <Text style={styles.studentName}>Nome do Aluno</Text>
            </View>

            <View style={styles.topContainer}>
                {/* Propriedade color usada diretamente no IconButton */}
                <IconButton 
                    icon="magnify" 
                    size={24}    
                    color="#fff"    
                    style={styles.searchIcon}   
                />
            </View>

            {loading ? (
                <Text style={styles.loadingText}>Carregando...</Text>
            ) : (
                <FlatList
                    data={posts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Card style={styles.card} onPress={() => navigation.navigate("LerPost", {
                            id: item.id,
                            title: item.title,
                            content: item.post_text,
                            date: item.date,
                            subject: item.subject,
                            teacher: item.teacher
                        })}>
                            <Text style={styles.cardTitle}>{item.title}</Text>
                            <Text style={styles.cardDate}>{item.date}</Text>
                        </Card>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fef9f7", // Fundo suave com um tom quente
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between", // Coloca logo à esquerda e nome à direita
        marginBottom: 15,
        marginTop: 10,
        paddingBottom: 10, // Reduzir altura do banner
    },
    logo: {
        width: 40,
        height: 40,
        resizeMode: "contain",
    },
    studentName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#151f71", // Cor do nome do aluno (usando azul escuro)
    },
    topContainer: {
        flexDirection: "row",
        justifyContent: "flex-end", // Ícone de pesquisa alinhado à direita
        marginBottom: 20,
    },
    searchIcon: {
        backgroundColor: "#fdb5a5", // Cor de fundo do ícone de pesquisa (laranja suave)
        borderRadius: 20,
        padding: 8,
    },
    loadingText: {
        fontSize: 18,
        color: "#ff7f7f", // Cor de carregamento (tom coral)
        fontWeight: "bold",
        textAlign: "center",
    },
    card: {
        marginVertical: 10,
        padding: 15,
        backgroundColor: "#fff", // Cor de fundo do card
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        borderWidth: 1,
        borderColor: "#151f71", // Borda do card com azul escuro
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#151f71", // Cor do título com base no azul escuro
        marginBottom: 5,
    },
    cardDate: {
        fontSize: 14,
        color: "#fe9a8b", // Cor suave para a data (coral suave)
        marginBottom: 10,
    },
});
