import { Formik } from "formik";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { createUser } from "../../functions/api/createUser";
import { createPerson } from "../../functions/api/createPerson";
import { createTeacher } from "../../functions/api/createTeacher";
import { Picker } from "@react-native-picker/picker";

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


export default function CreateTeacher(){
    return(
        <View>
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
                onSubmit={async(values) => {
                    try{
                        await createUser(values.username, values.password);
                        await createPerson(values.name, values.email, values.birth, values.cpf);
                        await createTeacher(values.id_subject, values.name);
                        Alert.alert('Professor criado com sucesso');
                    }catch(error){
                        Alert.alert('Erro ao criar professor');
                }}}
            >
                {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
                    <View>
                        <Text>Usuário</Text>
                        <TextInput
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                        />
                        <Text>Senha</Text>
                        <TextInput
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                        />
                        <Text>Nome</Text>
                        <TextInput
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                        />
                        <Text>Email</Text>
                        <TextInput
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                        <Text>Data de Nascimento</Text>
                        <TextInput
                            onChangeText={handleChange('birth')}
                            onBlur={handleBlur('birth')}
                            value={values.birth}
                        />
                        <Text>CPF</Text>
                        <TextInput
                            onChangeText={handleChange('cpf')}
                            onBlur={handleBlur('cpf')}
                            value={values.cpf}
                        />
                        <Text>Matéria</Text>
                        <Picker
                            selectedValue={values.id_subject}
                            onValueChange={(itemValue) => setFieldValue('id_subject', itemValue)}
                        >
                            <Picker.Item label="Selecione uma matéria" value="" />
                            {subjects.map((subject) => (
                                <Picker.Item key={subject.id} label={subject.name} value={subject.id} />
                            ))}
                        </Picker>
                        <TouchableOpacity onPress={() => handleSubmit()}>
                            <Text>Criar Aluno</Text>
                        </TouchableOpacity>
                    </View>
                )}

            </Formik>
        </View>
    )
}