import React from "react";
import { Button, Text, View, ScrollView, StyleSheet } from "react-native";
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
      <Button title="Voltar" onPress={() => navigation.navigate("PostList")} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.meta}>Professor: {teacher}</Text>
        <Text style={styles.meta}>Matéria: {subject}</Text>
        <Text style={styles.meta}>Data: {date}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  contentContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  meta: {
    fontSize: 16,
    color: "gray",
    marginBottom: 5,
  },
  content: {
    fontSize: 18,
    lineHeight: 24,
    marginTop: 15,
  },
});
