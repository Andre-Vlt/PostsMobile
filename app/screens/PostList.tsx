import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";

export default function PostList() {
    const navigation = useNavigation();
    return(
        <View>
            <Text>PostList</Text>
            <Button title="Return" onPress={() => navigation.navigate("Login")} />
        </View>
    )
}
