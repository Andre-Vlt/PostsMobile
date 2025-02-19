import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Formik } from "formik";
import { Alert, Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { CriaPost } from "../../functions/api/createPost";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";


type StackParamList = {
    PostList: undefined;
}

type Post = {
    id_teacher: string;
    id_subject: number;
    post_text: string;
    post_title: string;
}

type CreatePostScreenStackNavigationProp = StackNavigationProp<StackParamList>
export default function CreatePost(){
    const navigation = useNavigation<CreatePostScreenStackNavigationProp>();
    const [idTeacher, setIdTeacher] = useState<string | null>(null);

    const subjects = [
        { id: '1', name: 'Português'},
        { id: '2', name: 'Matemática'},
        { id: '3', name: 'Ciências'},
        { id: '4', name: 'História'},
        { id: '5', name: 'Geografia'},
        { id: '6', name: 'Inglês'},
        { id: '7', name: 'Física'},
        { id: '8', name: 'Química'},
        { id: '9', name: 'Tecnologia'},
    ];

    useEffect(() => {
        const fetchTeacherId = async()=>{
            const teacherId = await AsyncStorage.getItem('teacherId');
            setIdTeacher(teacherId);
        } 

        fetchTeacherId();
    },[])

    return(
        <View>
            <View>
                <Text>Criar Post</Text>
                <Button title= "Voltar" onPress={() => {navigation.navigate("PostList")}} />
            </View>
            <View>
                <Formik initialValues={
                    {
                        id_teacher: idTeacher,
                        id_subject: null,
                        post_text: '',
                        post_title: ''
                    }}
                    enableReinitialize
                    onSubmit={
                        async(values) => {
                            try
                            {
                                await CriaPost(values.id_teacher, values.id_subject, values.post_text, values.post_title);
                                Alert.alert('Post criado com sucesso');
                            }catch(error){
                                console.error('Erro ao criar post: ',error);
                            }
                        }
                    }
                    >
                    {({handleChange, handleBlur, handleSubmit, values, setFieldValue}) => (
                        <View>
                            <TextInput
                                placeholder="Título"
                                onChangeText={handleChange('post_title')}
                                onBlur={handleBlur('post_title')}
                                value={values.post_title}
                                />
                            <TextInput
                                placeholder="Conteúdo"
                                onChangeText={handleChange('post_text')}
                                onBlur={handleBlur('post_text')}
                                value={values.post_text}
                                />
                            <Picker
                                selectedValue={values.id_subject}
                                onValueChange={(itemValue) => setFieldValue('id_subject', itemValue)}
                                >
                                <Picker.Item label = "Selecione uma matéria" value = "" />
                                {subjects.map((subject) => (
                                    <Picker.Item key={subject.id} label={subject.name} value={subject.id} />
                                ))}"
                            </Picker>  
                            <TouchableOpacity onPress={()=>handleSubmit()}>
                                <Text>Criar Post</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </View>
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