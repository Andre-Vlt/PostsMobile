import { useNavigation } from "@react-navigation/native";
import { Text, View, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

type StackParamList = {
    PostList: undefined;
}

type EditPostScreenNavigationProp = StackNavigationProp<StackParamList>;

export default function EditarPost(){
    const navigation = useNavigation<EditPostScreenNavigationProp>();
    return(
        <View>
            <Text>Editar Post</Text>
            <Button title= "Voltar" onPress={() => {navigation.navigate("PostList")}} />
        </View>
    )
}