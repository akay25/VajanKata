import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import axios from '~/api/axios';
import colors from '~/styles/colors';

import { Header } from '~/components/Header';
import { PlantCardPrimary } from '~/components/PlantCard';
import { Load } from '~/components/Load';

type IPlantProps = {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  frequency: {
    times: number;
    repeat_every: string;
  };
};

export function PlantSelect() {
  const [plants, setPlants] = useState<IPlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<IPlantProps[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const navigation = useNavigation();

  async function fecthPlants() {
    // const { data } = await axios.get(
    //   `plants?_sort=name&order=asc&_page=${page}&_limit=8`,
    // );
    const data = [
      {
        id: 1,
        name: "Neem",
        about: "A neem ka paed",
        water_tips: "Use can",
        photo: "http://192.168.0.100:8000/Neem-removebg-preview.png",
        frequency: {
          times: 2,
          repeat_every: "2 hours",
        }
      },
      {
        id: 2,
        name: "Sunflower",
        about: "A sunflower plant",
        water_tips: "Use can",
        photo: "https://ultimagardening.com/wp-content/uploads/2021/10/05-Ultima-Gardening-Nursery-Shop-Money-Plant-Green-68-540x680.png",
        frequency: {
          times: 2,
          repeat_every: "2 hours",
        }
      }
    ];

    if (!data) {
      return setLoading(true);
    }

    if (page > 1) {
      setPlants(oldValue => [...oldValue, ...data]);
      setFilteredPlants(oldValue => [...oldValue, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setLoading(false);
    setLoadingMore(false);
  }

  function handleFetchMore(distance: number) {
    if (distance <= 1) {
      return;
    }

    setLoadingMore(true);
    setPage(oldValue => oldValue + 1);
    fecthPlants();
  }

  function handlePlantSelect(plant: IPlantProps) {
    navigation.navigate('Plant', { plant });
  }

  useEffect(() => {
    fecthPlants();
  }, []);

  if (loading) {
    return <Load />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header firstText="Olá," />
      <View style={{ flex: 1, marginTop: 15 }}>
        <FlatList
          data={filteredPlants}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={styles.plantsList}
          keyExtractor={value => String(value.id)}
          renderItem={({ item: plant }) => (
            <PlantCardPrimary
              image={plant.photo}
              title={plant.name}
              onPress={() => handlePlantSelect(plant)}
            />
          )}
          onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
          onEndReachedThreshold={0.5}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  titleView: {
    paddingHorizontal: 32,
    marginTop: 40,
  },
  title: {
    fontSize: 17,
    lineHeight: 23,
    fontWeight: '700',
    color: colors.heading,
  },
  subTitle: {
    fontSize: 17,
    lineHeight: 23,
    color: colors.heading,
  },
  plantsList: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
});
