import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Formik } from "formik";
import { Alert, Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import { CriaPost } from "../../functions/api/createPost";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";

const colors = {
    primary: "#fdb5a5",
    secondary: "#fe9a8b",
    accent: "#ff7f7f",
    darkBlue: "#151f71",
    white: "#ffffff"
};

const subjects = [
    { id: '1', name: 'Português' },
    { id: '2', name: 'Matemática' },
    { id: '3', name: 'Ciências' },
    { id: '4', name: 'História' },
    { id: '5', name: 'Geografia' },
    { id: '6', name: 'Inglês' },
    { id: '7', name: 'Física' },
    { id: '8', name: 'Química' },
    { id: '9', name: 'Tecnologia' },
];

export default function CreatePost() {
    const navigation = useNavigation<StackNavigationProp<{ PostList: undefined }>>();
    const [idTeacher, setIdTeacher] = useState<string | null>(null);

    useEffect(() => {
        const fetchTeacherId = async () => {
            const teacherId = await AsyncStorage.getItem('teacherId');
            setIdTeacher(teacherId);
        }
        fetchTeacherId();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Criar Post</Text>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("PostList")}>
                <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>
            
            <Formik
                initialValues={{
                    id_teacher: idTeacher,
                    id_subject: null,
                    post_text: '',
                    post_title: ''
                }}
                enableReinitialize
                onSubmit={async (values) => {
                    try {
                        await CriaPost(values.id_teacher, values.id_subject, values.post_text, values.post_title);
                        Alert.alert('Post criado com sucesso');
                    } catch (error) {
                        console.error('Erro ao criar post: ', error);
                    }
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            placeholder="Título"
                            placeholderTextColor={colors.darkBlue}
                            onChangeText={handleChange('post_title')}
                            onBlur={handleBlur('post_title')}
                            value={values.post_title}
                        />
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Conteúdo"
                            placeholderTextColor={colors.darkBlue}
                            onChangeText={handleChange('post_text')}
                            onBlur={handleBlur('post_text')}
                            value={values.post_text}
                            multiline
                        />
                        <Picker
                            selectedValue={values.id_subject}
                            style={styles.picker}
                            onValueChange={(itemValue) => setFieldValue('id_subject', itemValue)}
                        >
                            <Picker.Item label="Selecione uma matéria" value="" />
                            {subjects.map((subject) => (
                                <Picker.Item key={subject.id} label={subject.name} value={subject.id} />
                            ))}
                        </Picker>
                        <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit()}>
                            <Text style={styles.submitButtonText}>Criar Post</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        padding: 20,
        justifyContent: 'center'
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.darkBlue,
        textAlign: 'center',
        marginBottom: 20
    },
    backButton: {
        backgroundColor: colors.darkBlue,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20
    },
    backButtonText: {
        color: colors.white,
        fontSize: 16
    },
    form: {
        backgroundColor: colors.white,
        padding: 20,
        borderRadius: 10
    },
    input: {
        borderWidth: 1,
        borderColor: colors.secondary,
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        color: colors.darkBlue
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top'
    },
    picker: {
        borderWidth: 1,
        borderColor: colors.secondary,
        borderRadius: 8,
        marginBottom: 10
    },
    submitButton: {
        backgroundColor: colors.accent,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    submitButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold'
    }
});


