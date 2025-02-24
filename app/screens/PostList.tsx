import React, { useCallback, useState } from "react";
import { View, FlatList, Text, StyleSheet, Image } from "react-native";
import { Button, Card, Icon, IconButton } from "react-native-paper";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { fetchPosts } from "../../functions/api/getPosts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatarData } from "../../functions/auxiliares/formatarData";
import { GetUserData } from "../../functions/api/getUserData";
import { DeletePost } from "../../functions/api/deletePost";
import { TextInput } from "react-native-gesture-handler";
import { SearchPost } from "../../functions/api/searchPost.ts";
import { DrawerNavigationProp } from "@react-navigation/drawer";

type StackParamList = {
    Login: undefined;
    PostList: undefined;
    EditarPost: { id: string, title: string, content: string };
    LerPost: { id: string, title: string, content: string, date: string, subject: string, teacher: string };
}

type DrawerParamList = {
    PostList: undefined;
    CreatePost: undefined;
    CreateStudent: undefined;
    CreateTeacher: undefined;
}

type User = {
    id_person: string;
    id_user: string;
    name: string;
    email: string;
    birth: string;
    cpf: string;
}

export default function PostList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [userData, setUserData] = useState<User>({ id_person: '', id_user: '', name: '', email: '', birth: '', cpf: '' });
    const [showSearch, setShowSearch] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);
    const navigation = useNavigation<StackNavigationProp<StackParamList>>();
    const drawerNavigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();


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
                    subject: post.subject_name || '',
                    teacher: post.teacher_name,
                    post_text: post.post_text
                }));
                setPosts(formattedPosts);
                setFilteredPosts(formattedPosts);                
            } else {
                console.error("Erro! A API não retornou um array!", data);
                setPosts([]);
                setFilteredPosts([]);
            }

            const user = await GetUserData();
            setUserData(user);

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

    const handleSearch = async (text:string) => {
        setSearchText(text);

        if(text === ''){
            loadPosts();
        }
        else{
            const filtered = await SearchPost(text);
            const formattedFilteredPosts = filtered.map((post:any) => ({
                id: post.id_post,
                title: post.post_title,
                date: formatarData(post.post_date),
                teacher: post.teacher_name,
                post_text: post.post_text
            }))
            setFilteredPosts(formattedFilteredPosts);
        }
    }

    return (
        <View style={styles.container}>
            {/* Topo com logo à esquerda e nome do aluno à direita */}
            <View style={styles.header}>
                <Button onPress={() => drawerNavigation.toggleDrawer()}>☰</Button>
                <Image source={require('../../assets/images/Books.png')} style={styles.logo} />
                <Text style={styles.studentName}>{userData.name}</Text>
            </View>

            <View style={styles.topContainer}>
                <IconButton 
                    icon="magnify"
                    size={24}
                    iconColor="#fff"
                    style={styles.searchIcon}
                    onPress={() => setShowSearch(!showSearch)}
                />
            </View>

            {showSearch ? (
                <TextInput
                    style={styles.searchInput}
                    placeholder="Pesquisar..."
                    value={searchText}
                    onChangeText={handleSearch}
                />
            ) : null}

            {loading ? (
                <Text style={styles.loadingText}>Carregando...</Text>
            ) : (
                <FlatList
                    data={filteredPosts}
                    keyExtractor={(item, index) => item.id?.toString() || String(index)}
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
                            {
                                visible?(
                                    <View style={styles.editAndTrashContainer}>
                                        <IconButton 
                                            icon="pencil"
                                            iconColor="#ff7f7f"
                                            size={27}
                                            onPress={() => {navigation.navigate("EditarPost",{id: item.id, title: item.title, content: item.post_text})}}
                                        />
                                        <IconButton 
                                            icon="trash-can"
                                            iconColor="red"
                                            size={27}
                                            onPress={async () => {
                                                await DeletePost(item.id);
                                                loadPosts();
                                            }}
                                        />
                                    </View>
                                ): null
                            }
                        </Card>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    searchInput: {
        backgroundColor: "#fdb5a5", // Cor de fundo do campo de pesquisa (laranja suave)
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    editAndTrashContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
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
