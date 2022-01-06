import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import axios from "axios";

type pokemon = {
  image: string;
  name: string;
  weight: number;
  hp: number;
  attack: number;
  defense: number;
};

export default function App() {
  const [pokemons, setPokemons] = React.useState<pokemon[]>([]);

  const link = "https://pokeapi.co/api/v2/pokemon/";

  // const url = new URL(link)
  // let params = new URLSearchParams(url.search);

  // params.append("name", "charmander")
  // params.append("level", "45")

  const fetchData = async (idList: number[]): Promise<void> => {
    try {
      const pokemons: pokemon[] = [];

      for (let i = 0; i < idList.length; i++) {
        const res = await axios.get(link + idList[i]);

        const { name, stats, weight, sprites } = res.data;

        const image = sprites.front_default;

        const hp = stats[0].base_stat;
        const attack = stats[1].base_stat;
        const defense = stats[2].base_stat;

        pokemons.push({
          name,
          weight,
          hp,
          attack,
          defense,
          image,
        });
      }

      setPokemons(pokemons);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData([1, 4, 7, 12, 55]);
  }, []);

  useEffect(() => {
    console.log(pokemons);
  }, [pokemons]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemons!</Text>
      <Image
        source={{
          uri: "https://img.redbull.com/images/c_fill,w_1200,h_630,g_auto,f_auto,q_auto/redbullcom/2016/09/20/1331818966444_2/pok%C3%A9mon-super-mystery-dungeon",
        }}
        style={{ width: "100%", height: 300, marginBottom: 30 }}
      />
      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          const { image, name, attack, defense, hp, weight } = item;

          return (
            <View style={styles.card}>
              <Image
                source={{ uri: image }}
                style={{ width: "100%", height: 60 }}
              />
              <Text style={styles.cardTitle}>{name}</Text>
              <Text style={styles.cardStats}>att {attack}</Text>
              <Text style={styles.cardStats}>dfs {defense}</Text>
              <Text style={styles.cardStats}>hp {hp}</Text>
              <Text style={styles.cardStats}>weight {weight}</Text>
            </View>
          );
        }}
      />
      {/* <View>
        {pokemons.map((pokemon) => {
          const { image, name, attack, defense, hp, weight } = pokemon;

          return (
            <View style={styles.card}>
              <Image
                source={{ uri: image }}
                style={{ width: "100%", height: 60 }}
              />
              <Text style={styles.cardTitle}>{name}</Text>
              <Text style={styles.cardStats}>att {attack}</Text>
              <Text style={styles.cardStats}>dfs {defense}</Text>
              <Text style={styles.cardStats}>hp {hp}</Text>
              <Text style={styles.cardStats}>weight {weight}</Text>
            </View>
          );
        })}
      </View> */}
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    marginTop: 30,
    position: "absolute",
    top: 10,
    left: "40%",
    zIndex: 3,
  },
  card: {
    backgroundColor: "#fff",
    padding: 30,
    marginBottom: 10,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 20,
    color: "#333",
    fontWeight: "700",
    marginBottom: 10,
  },
  cardStats: {
    color: "#333",
  },
});

// const theme = {
//   color: {
//     white: "#fff",
//     black: "#333"
//   }
// }
