import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, View, TouchableOpacity, StyleSheet, Animated, TextInput, ScrollView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
import { UpdatePost } from "../../functions/api/updatePost";
import { Picker } from "@react-native-picker/picker";

type StackParamList = {
  PostList: undefined;
  EditarPost: { id: string; title: string; content: string };
};

type EditPostScreenNavigationProp = StackNavigationProp<StackParamList>;

export default function EditarPost() {
  const scale = new Animated.Value(1);
  const route = useRoute();
  const navigation = useNavigation<EditPostScreenNavigationProp>();
  const { id, title, content } = route.params as { id: number; title: string; content: string };
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);
  const [subject, setSubject] = useState(1);

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleSave = async () => {
    if (newTitle.trim() === "" || newContent.trim() === "") {
      alert("Preencha todos os campos");
      return;
    }

    try {
      await UpdatePost(id, newTitle, newContent, subject);
      alert("Post editado com sucesso");
      navigation.navigate("PostList");
    } catch (error) {
      console.error("Erro ao editar post: ", error);
      alert("Erro ao editar post");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => navigation.navigate("PostList")}
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>

        <View style={styles.postContainer}>
          <Text style={styles.title}>Editar Post</Text>
          <Picker
            selectedValue={subject}
            onValueChange={(itemValue) => setSubject(itemValue)}
            style={styles.picker}
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
            style={styles.input}
            placeholder="Título"
            value={newTitle}
            onChangeText={setNewTitle}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Conteúdo"
            value={newContent}
            onChangeText={setNewContent}
            multiline
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  container: {
    backgroundColor: "#f8f8f8",
    padding: 20,
    alignItems: "center",
    width: "100%",
  },
  postContainer: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#151f71",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#151f71",
    marginBottom: 20,
    textAlign: "center",
  },
  picker: {
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 15,
    borderRadius: 8,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#fe9a8b",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#ff7f7f",
    elevation: 3,
    alignItems: "center",
    width: "80%",
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: "#151f71",
    borderColor: "#151f71",
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    width: "auto",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});