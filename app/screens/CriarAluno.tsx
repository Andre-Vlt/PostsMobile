import { Formik } from "formik";
import { Alert, Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { createUser } from "../../functions/api/createUser";
import { createPerson } from "../../functions/api/createPerson";
import { createStudent } from "../../functions/api/createStudent";

export default function CreateStudent(){
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
                    grade: ''
                }}
                enableReinitialize
                onSubmit={async(values) => {
                    try{
                        await createUser(values.username, values.password);
                        await createPerson(values.name, values.email, values.birth, values.cpf);
                        await createStudent(values.grade);
                        Alert.alert('Aluno criado com sucesso');
                    }catch(error){
                        Alert.alert('Erro ao criar aluno');
                }}}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
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
                        <Text>Série</Text>
                        <TextInput
                            onChangeText={handleChange('grade')}
                            onBlur={handleBlur('grade')}
                            value={values.grade}
                        />
                        <TouchableOpacity onPress={() => handleSubmit()}>
                            <Text>Criar Aluno</Text>
                        </TouchableOpacity>
                    </View>
                )}

            </Formik>
        </View>
    )
}