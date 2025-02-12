import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { ValidaProfessor } from "../../functions/auxiliares/validaProfessor";
import { StackNavigationProp } from "@react-navigation/stack";

type StackParamList = {
    Login: undefined;
}

type PostListScreenNavigationProp = StackNavigationProp<StackParamList>;

export default function PostList() 
{
    const navigation = useNavigation<PostListScreenNavigationProp>();
    const [visibility, setVisibility] = useState(false);

    useEffect(() => 
    {
        const checkTeacherStatus = 
            async () =>
            {
                const validacao = await ValidaProfessor();
                setVisibility(validacao);
            };
        checkTeacherStatus();
    },[]);

    return(
        <View>
            <Text>PostList</Text>
            {visibility && <Text>Professor</Text>}
            <Button title="Return" onPress={() => navigation.navigate("Login")} />
        </View>
    )
}
