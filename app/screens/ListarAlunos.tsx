import { useCallback, useState } from "react";
import { FlatList, Text, View, ActivityIndicator, StyleSheet } from "react-native";
import { getAllStudents } from "../../functions/api/getAllStudents";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Card, IconButton } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";

const colors = {
    primary: "#fdb5a5",
    secondary: "#fe9a8b",
    accent: "#ff7f7f",
    darkBlue: "#151f71",
    white: "#ffffff"
};

type StackParamList = {
    EditarAluno: { student: any };
};

export default function StudentList() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<StackNavigationProp<StackParamList>>();

    const loadStudents = async () => {
        try {
            setLoading(true);
            const data = await getAllStudents();
            setStudents(data);
        } catch (error) {
            console.error("Erro ao buscar alunos: ", error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadStudents();
        }, [])
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Listar de Alunos</Text>
            {loading ? (
                <ActivityIndicator size="large" color={colors.darkBlue} />
            ) : (
                <FlatList
                    data={students}
                    keyExtractor={(item) => item.id_student.toString()}
                    renderItem={({ item }) => (
                        <Card style={styles.card}>
                            <View style={styles.cardContent}>
                                <View>
                                    <Text style={styles.studentName}>{item.student_name}</Text>
                                    <Text style={styles.grade}>Série: {item.grade}</Text>
                                </View>
                                <IconButton 
                                    icon="pencil"
                                    size={24}
                                    iconColor={colors.white}
                                    onPress={() => navigation.navigate("EditarAluno", { student: item })}
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
    studentName: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.darkBlue,
    },
    grade: {
        fontSize: 16,
        color: colors.secondary,
    },
    editButton: {
        backgroundColor: colors.accent,
        borderRadius: 50,
    },
});