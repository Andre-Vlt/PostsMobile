import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, View, TouchableOpacity, StyleSheet, Animated, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { UpdatePost } from "../../functions/api/updatePost";
import { Picker } from "@react-native-picker/picker";

type StackParamList = {
  PostList: undefined;
    EditarPost: { id: string, title: string, content: string };
};

type EditPostScreenNavigationProp = StackNavigationProp<StackParamList>;

export default function EditarPost(){
    const scale = new Animated.Value(1);
    const route = useRoute();
    const navigation = useNavigation<EditPostScreenNavigationProp>();
    const { id, title, content } = route.params as {id: number, title: string, content: string};
    const [newTitle, setNewTitle] = useState(title);
    const [newContent, setNewContent] = useState(content);
    const [subject, setSubject] = useState(1);


    const handlePressIn = () => {
      Animated.spring(scale, {
        toValue: 0.95, // Reduz um pouco o tamanho do botão
        useNativeDriver: true,
      }).start();
    };
  
    const handlePressOut = () => {
      Animated.spring(scale, {
        toValue: 1, // Volta ao tamanho normal
        useNativeDriver: true,
      }).start();
    };


    const handleSave = async()=>
    {
        if (newTitle.trim() === '' || newContent.trim() === '') {
            alert('Preencha todos os campos');
            return;
        }

        try
        {
            await UpdatePost(id, newTitle, newContent, subject);
            alert('Post editado com sucesso');
            navigation.navigate("PostList");
        }
        catch(error)
        {
            console.error('Erro ao editar post: ', error);
            alert('Erro ao editar post');
        }
    }
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Editar Post</Text>
            <Picker
                selectedValue={subject}
                onValueChange={(itemValue) => setSubject(itemValue)}
            >
                <Picker.Item label="Português" value="1" />
                <Picker.Item label="Matemática" value="2" />
                <Picker.Item label="Ciências" value="3" />
                <Picker.Item label="História" value="4" />
                <Picker.Item label="Geografia" value="5" />
                <Picker.Item label="Inglês" value="6" />
                <Picker.Item label="Física" value="7" />
                <Picker.Item label="Química" value="8" />
                <Picker.Item label="Tecnologia" value="9" />
            </Picker>
            
            <TextInput 
                placeholder="Título"
                value={newTitle}
                onChangeText={setNewTitle}    
            />

            <TextInput 
                placeholder="Conteúdo"
                value={newContent}
                onChangeText={setNewContent}
                multiline
                numberOfLines={30}
            />
            <Button title="Salvar" onPress={handleSave} />
            <Animated.View style={{ transform: [{ scale }]}}>
              <TouchableOpacity
                style={styles.button}
                onPressIn={handlePressIn} // Quando o botão for pressionado
                onPressOut={handlePressOut} // Quando o botão for solto
                onPress={() => { navigation.navigate("PostList") }}
              >
                <Text style={styles.buttonText}>Voltar</Text>
              </TouchableOpacity>
            </Animated.View>
            
            
        </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Cor de fundo
    padding: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#151f71", // Cor primária (azul escuro)
    marginBottom: 40,
    textAlign: "center",
    letterSpacing: 1.2, // Para um toque mais sofisticado
  },
  button: {
    backgroundColor: "#fe9a8b", // Cor do botão (rosa médio)
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 50, // Bordas arredondadas para um visual mais suave
    borderWidth: 1.5,
    borderColor: "#ff7f7f", // Cor de borda para efeito sutil
    elevation: 5, // Sombras para efeito 3D
    alignItems: "center", // Centraliza o texto do botão
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600", // Menos grosso para um look mais elegante
    letterSpacing: 1.2, // Para manter um toque mais moderno
  },
});

