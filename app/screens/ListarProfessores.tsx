import { useCallback, useState } from "react";
import { FlatList, Text, View, ActivityIndicator, StyleSheet } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Card, IconButton } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { getAllTeachers } from "../../functions/api/getAllTeachers";

const colors = {
    primary: "#fdb5a5",
    secondary: "#fe9a8b",
    accent: "#ff7f7f",
    darkBlue: "#151f71",
    white: "#ffffff"
};

type StackParamList = {
    EditarProfessor: { teacher: any };
};

export default function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<StackNavigationProp<StackParamList>>();

    const loadTeachers = async () => {
        try {
            setLoading(true);
            const data = await getAllTeachers();
            setTeachers(data);
        } catch (error) {
            console.error("Erro ao buscar professores: ", error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadTeachers();
        }, [])
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Listar Professores</Text>
            {loading ? (
                <ActivityIndicator size="large" color={colors.darkBlue} />
            ) : (
                <FlatList
                    data={teachers}
                    keyExtractor={(item) => item.id_teacher.toString()}
                    renderItem={({ item }) => (
                        <Card style={styles.card}>
                            <View style={styles.cardContent}>
                                <View>
                                    <Text style={styles.teacherName}>{item.teacher_name}</Text>
                                    <Text style={styles.subject}>Matéria: {item.id_subject}</Text>
                                </View>
                                <IconButton 
                                    icon="pencil"
                                    size={24}
                                    iconColor={colors.white}
                                    onPress={() => navigation.navigate("EditarProfessor", { teacher: item })}
                                    style={styles.editButton}
                                />
                            </View>
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
        backgroundColor: colors.primary,
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        color: colors.darkBlue,
        textAlign: "center",
        marginBottom: 20,
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    cardContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    teacherName: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.darkBlue,
    },
    subject: {
        fontSize: 16,
        color: colors.secondary,
    },
    editButton: {
        backgroundColor: colors.accent,
        borderRadius: 50,
    },
});