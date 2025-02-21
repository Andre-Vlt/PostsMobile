import { useNavigation } from "@react-navigation/native";
import { Text, View, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

type StackParamList = {
  PostList: undefined;
};

type EditPostScreenNavigationProp = StackNavigationProp<StackParamList>;

export default function EditarPost() {
  const navigation = useNavigation<EditPostScreenNavigationProp>();

  // Criando uma animação para o botão
  const scale = new Animated.Value(1);

  // Função para animar o botão
  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95, // Reduz um pouco o tamanho do botão
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1, // Volta ao tamanho normal
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Post</Text>

      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity
          style={styles.button}
          onPressIn={handlePressIn} // Quando o botão for pressionado
          onPressOut={handlePressOut} // Quando o botão for solto
          onPress={() => { navigation.navigate("PostList") }}
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#151f71", // Cor de fundo
    padding: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fdb5a5", // Cor primária (rosa claro)
    marginBottom: 40,
    textAlign: "center",
    letterSpacing: 1.2, // Para um toque mais sofisticado
  },
  button: {
    backgroundColor: "#fe9a8b", // Cor do botão (rosa médio)
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 50, // Bordas arredondadas para um visual mais suave
    borderWidth: 1.5,
    borderColor: "#ff7f7f", // Cor de borda para efeito sutil
    elevation: 5, // Sombras para efeito 3D
    alignItems: "center", // Centraliza o texto do botão
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600", // Menos grosso para um look mais elegante
    letterSpacing: 1.2, // Para manter um toque mais moderno
  },
});

