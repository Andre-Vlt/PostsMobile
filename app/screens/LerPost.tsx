import React from "react";
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type StackParamList = {
  LerPost: { id: string; title: string; content: string; date: string; subject: string; teacher: string };
  PostList: undefined;
};

type LerPostRouteProp = RouteProp<StackParamList, "LerPost">;
type LerPostScreenNavigationProp = StackNavigationProp<StackParamList, "LerPost">;

export default function LerPost({ route }: { route: LerPostRouteProp }) {
  const { title, content, date, subject, teacher } = route.params;
  const navigation = useNavigation<LerPostScreenNavigationProp>();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("PostList")}>
          <Text style={styles.buttonText}>← Voltar</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.meta}>Professor: <Text style={styles.metaValue}>{teacher}</Text></Text>
        <Text style={styles.meta}>Matéria: <Text style={styles.metaValue}>{subject}</Text></Text>
        <Text style={styles.meta}>Data: <Text style={styles.metaValue}>{date}</Text></Text>
        <Text style={styles.content}>{content}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fef9f7",
  },
  buttonContainer: {
    alignItems: "flex-end",
  },
  button: {
    backgroundColor: "#3b4cca", // Azul mais claro para destacar a sombra
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    flexDirection: "row",
    
    // Sombra melhorada para mais visibilidade
    shadowColor: "#151f71",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  contentContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#3b4cca",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#151f71",
    textAlign: "center",
  },
  meta: {
    fontSize: 16,
    color: "#ff7f7f",
    marginBottom: 5,
    fontWeight: "bold",
  },
  metaValue: {
    color: "#151f71",
    fontWeight: "normal",
  },
  content: {
    fontSize: 18,
    lineHeight: 24,
    marginTop: 15,
    color: "#333",
    textAlign: "justify",
  },
});
