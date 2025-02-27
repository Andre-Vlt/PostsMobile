import { Formik } from "formik";
import { Alert, Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { createUser } from "../../functions/api/createUser";
import { createPerson } from "../../functions/api/createPerson";
import { createTeacher } from "../../functions/api/createTeacher";

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

export default function CreateTeacher() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Cadastrar Professores</Text>

            <Formik
                initialValues={{
                    username: '',
                    password: '123456',
                    name: '',
                    email: '',
                    birth: '',
                    cpf: '',
                    id_subject: null,
                }}
                enableReinitialize
                onSubmit={async (values) => {
                    try {
                        await createUser(values.username, values.password);
                        await createPerson(values.name, values.email, values.birth, values.cpf);
                        await createTeacher(values.id_subject, values.name);
                        Alert.alert('Professor criado com sucesso');
                    } catch (error) {
                        Alert.alert('Erro ao criar professor');
                    }
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
                    <View style={styles.form}>
                        <Text style={styles.label}>Usuário</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o usuário"
                            placeholderTextColor={colors.darkBlue}
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                        />

                        <Text style={styles.label}>Senha</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite a senha"
                            placeholderTextColor={colors.darkBlue}
                            secureTextEntry
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                        />

                        <Text style={styles.label}>Nome</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o nome"
                            placeholderTextColor={colors.darkBlue}
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                        />

                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o email"
                            placeholderTextColor={colors.darkBlue}
                            keyboardType="email-address"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />

                        <Text style={styles.label}>Data de Nascimento</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="DD/MM/AAAA"
                            placeholderTextColor={colors.darkBlue}
                            keyboardType="numeric"
                            onChangeText={handleChange('birth')}
                            onBlur={handleBlur('birth')}
                            value={values.birth}
                        />

                        <Text style={styles.label}>CPF</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o CPF"
                            placeholderTextColor={colors.darkBlue}
                            keyboardType="numeric"
                            onChangeText={handleChange('cpf')}
                            onBlur={handleBlur('cpf')}
                            value={values.cpf}
                        />

                        <Text style={styles.label}>Matéria</Text>
                        <View style={styles.pickerContainer}>
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
                        </View>

                        <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit()}>
                            <Text style={styles.submitButtonText}>Criar</Text>
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
        fontSize: 26,
        fontWeight: 'bold',
        color: colors.darkBlue,
        textAlign: 'center',
        marginBottom: 20
    },
    form: {
        backgroundColor: colors.white,
        padding: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.darkBlue,
        marginBottom: 5
    },
    input: {
        borderWidth: 1,
        borderColor: colors.secondary,
        padding: 12,
        borderRadius: 10,
        marginBottom: 12,
        color: colors.darkBlue,
        fontSize: 16,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: colors.secondary,
        borderRadius: 10,
        backgroundColor: colors.white,
        marginBottom: 12,
        overflow: 'hidden'
    },
    picker: {
        width: "100%",
        color: colors.darkBlue
    },
    submitButton: {
        backgroundColor: colors.accent,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    submitButtonText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: 'bold'
    }
});
