import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, Button } from "react-native";
import { Card, FAB, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { fetchPosts } from "../../functions/api/getPosts";
import AsyncStorage from "@react-native-async-storage/async-storage";


type StackParamList = {
    Login:undefined;
    PostList:undefined;
    CreatePost:undefined;
    EditarPost: undefined;
}

export default function PostList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const navigation = useNavigation<StackNavigationProp<StackParamList>>();
    
    const handleCreatePost = () => {
        navigation.navigate("CreatePost");
    }

  useEffect(() => {
    const loadPosts = async () => 
    {
        try 
        {
            setLoading(true);
            if(await AsyncStorage.getItem('isTeacher') === 'true')
            {
                setVisible(true);
            }
            const data = await fetchPosts();
            if (Array.isArray(data))
            {
                const formattedPosts = data.map((post) => 
                ({
                    id:post.id_post,
                    title: post.post_title,
                    date: post.post_date,
                    subject: post.subject_name,
                    teacher: post.teacher_name,
                }));
                setPosts(formattedPosts);
            }
            else
            {
                console.error("Erro! A API não retornou um array!", data);
                setPosts([]);
            }           
        }
        catch(error)
        {
            console.error("Erro ao buscar post: ", error);
        }
        finally
        {
            setLoading(false);
        }
    };
    
    loadPosts();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
        <View style={styles.topContainer}>
            {visible ? (<Button title = "Criar Post" onPress={handleCreatePost} />) : null}
            <IconButton icon = "magnify" size= {24} />
        </View>

      {loading ? (
        <Text>Carregando...</Text>
        ) : (
            <FlatList 
                data = {posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Card style={{ marginVertical: 5, padding: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.title}</Text>
                        <Text>{item.date}</Text>
                        {visible ? (<IconButton icon="pencil" size={24} onPress={ ()=> {navigation.navigate("EditarPost")} }/>) : null}
                        {visible ? (<IconButton icon="delete" size={24} />) : null}
                    </Card>
                )}
        />
      )}
    </View>
);
}


const styles = StyleSheet.create({
    topContainer:{
        display: "flex",
        flexDirection: "row",
    }
});