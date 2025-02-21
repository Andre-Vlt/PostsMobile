import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, View, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { UpdatePost } from "../../functions/api/updatePost";
import { Picker } from "@react-native-picker/picker";

type StackParamList = {
    PostList: undefined;
    EditarPost: { id: string, title: string, content: string };
}

type EditPostScreenNavigationProp = StackNavigationProp<StackParamList>;

export default function EditarPost(){
    const route = useRoute();
    const navigation = useNavigation<EditPostScreenNavigationProp>();
    const { id, title, content } = route.params as {id: number, title: string, content: string};
    const [newTitle, setNewTitle] = useState(title);
    const [newContent, setNewContent] = useState(content);
    const [subject, setSubject] = useState(1);

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
        <View>
            <Text>Editar Post</Text>
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
            <Button title="Cancelar" onPress={() => {navigation.navigate("PostList")}} />
        </View>
    )
}