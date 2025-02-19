import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Text, View } from "react-native";


type StackParamList = {
    PostList: undefined;
}

type CreatePostScreenStackNavigationProp = StackNavigationProp<StackParamList>
export default function CreatePost(){
    const navigation = useNavigation<CreatePostScreenStackNavigationProp>();
    return(
        <View>
            <Text>Criar Post</Text>
            <Button title= "Voltar" onPress={() => {navigation.navigate("PostList")}} />
        </View>
    )
}




// import React, { useEffect, useState } from "react";
// import { View, FlatList, Alert } from "react-native";
// import { Text, TextInput, Button, Card, FAB } from "react-native-paper";
// import { useNavigation } from "@react-navigation/native";
// import { StackNavigationProp } from "@react-navigation/stack";

// type Post = {
//   id: number;
//   title: string;
//   body: string;
//   userId: number;
// };

// const API_URL = "https://jsonplaceholder.typicode.com/posts";

// export default function CriarPost() {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [title, setTitle] = useState("");
//   const [body, setBody] = useState("");
//   const [editingPost, setEditingPost] = useState<Post | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const fetchPosts = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(API_URL);
//       const data = await response.json();
//       setPosts(data.slice(0, 10)); // Limita a 10 posts
//     } catch (error) {
//       Alert.alert("Erro", "Erro ao buscar posts");
//     }
//     setLoading(false);
//   };

//   const handleCreatePost = async () => {
//     if (!title || !body) return Alert.alert("Atenção", "Preencha todos os campos!");

//     const newPost: Post = { id: Math.random(), title, body, userId: 1 };
    
//     try {
//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newPost),
//       });

//       if (!response.ok) throw new Error();

//       setPosts([newPost, ...posts]);
//       setTitle("");
//       setBody("");
//       Alert.alert("Sucesso", "Post criado!");
//     } catch {
//       Alert.alert("Erro", "Erro ao criar post");
//     }
//   };

//   const handleEditPost = async () => {
//     if (!editingPost) return;
    
//     try {
//       const response = await fetch(${API_URL}/${editingPost.id}, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...editingPost, title, body }),
//       });

//       if (!response.ok) throw new Error();

//       setPosts(posts.map(post => post.id === editingPost.id ? { ...post, title, body } : post));
//       setEditingPost(null);
//       setTitle("");
//       setBody("");
//       Alert.alert("Sucesso", "Post atualizado!");
//     } catch {
//       Alert.alert("Erro", "Erro ao atualizar post");
//     }
//   };

//   const handleDeletePost = async (id: number) => {
//     try {
//       await fetch(${API_URL}/${id}, { method: "DELETE" });

//       setPosts(posts.filter(post => post.id !== id));
//       Alert.alert("Sucesso", "Post excluído!");
//     } catch {
//       Alert.alert("Erro", "Erro ao excluir post");
//     }
//   };

//   return (
//     <View style={{ flex: 1, padding: 20 }}>
//       <Text variant="titleLarge" style={{ textAlign: "center", marginBottom: 10 }}>
//         Gerenciador de Posts
//       </Text>

//       <TextInput
//         label="Título"
//         value={title}
//         onChangeText={setTitle}
//         style={{ marginBottom: 10 }}
//       />

//       <TextInput
//         label="Conteúdo"
//         value={body}
//         onChangeText={setBody}
//         multiline
//         numberOfLines={3}
//         style={{ marginBottom: 10 }}
//       />

//       <Button
//         mode="contained"
//         onPress={editingPost ? handleEditPost : handleCreatePost}
//       >
//         {editingPost ? "Atualizar Post" : "Criar Post"}
//       </Button>

//       <FlatList
//         data={posts}
//         keyExtractor={(item) => item.id.toString()}
//         refreshing={loading}
//         onRefresh={fetchPosts}
//         renderItem={({ item }) => (
//           <Card style={{ marginTop: 10, padding: 10 }}>
//             <Text variant="titleMedium">{item.title}</Text>
//             <Text>{item.body}</Text>

//             <View style={{ flexDirection: "row", marginTop: 10 }}>
//               <Button onPress={() => {
//                 setEditingPost(item);
//                 setTitle(item.title);
//                 setBody(item.body);
//               }}>
//                 Editar
//               </Button>
//               <Button onPress={() => handleDeletePost(item.id)} color="red">
//                 Excluir
//               </Button>
//             </View>
//           </Card>
//         )}
//       />

//       <FAB
//         icon="plus"
//         style={{
//           position: "absolute",
//           right: 20,
//           bottom: 20,
//         }}
//         onPress={() => {
//           setEditingPost(null);
//           setTitle("");
//           setBody("");
//         }}
//       />
//     </View>
//   );
// }