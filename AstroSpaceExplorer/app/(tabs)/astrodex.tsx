import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useFavorites } from '@/hooks/useFavorites';
import { astroObjects } from '@/lib/aastroObjects';

type AstroObject = {
  id: number;
  name: string;
  type: string;
  description: string;
  diameter_km: number;
  distance_from_earth_km: number;
  temperature_c: number;
  image_url: string;
};

const typeFilters = ['All', 'planet', 'moon', 'star', 'Favorites'];

export default function AstroDexMini() {
  const [data, setData] = useState<AstroObject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    setTimeout(() => {
      setData(astroObjects);
      setLoading(false);
    }, 200); // Simulate network delay
  }, []);

  const filteredData = data.filter((obj) => {
    const matchesSearch =
      obj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      obj.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTypeFilter = (() => {
      if (activeFilter === 'All') return true;
      if (activeFilter === 'Favorites') return isFavorite(obj.id.toString());
      return obj.type.toLowerCase() === activeFilter.toLowerCase();
    })();

    return matchesSearch && matchesTypeFilter;
  });

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={{ flex: 1, marginTop: 24 }}>
      <TextInput
        placeholder="Search for 'planet' or 'moon'"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
        placeholderTextColor="#aaa"
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScrollContainer}
      >
        {typeFilters.map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setActiveFilter(type)}
            style={[
              styles.filterButton,
              activeFilter === type && styles.activeFilterButton,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === type && styles.activeFilterText,
              ]}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredData}
        contentContainerStyle={{ padding: 12 }}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image_url }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.type}>{item.type}</Text>
            <Text style={styles.description}>{item.description}</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>🌡 Temp:</Text>
              <Text style={styles.infoValue}>{item.temperature_c} °C</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>📏 Diameter:</Text>
              <Text style={styles.infoValue}>
                {item.diameter_km.toLocaleString()} km
              </Text>
            </View>
            <View style={styles.infoRow}>
              {item.distance_from_earth_km > 1_000_000_000 ? (
                <View style={{ flexDirection: 'column' }}>
                  <Text style={styles.infoLabel}>🪐 Distance from Earth: </Text>
                  <Text style={[styles.infoValue, { marginTop: 4 }]}>
                    {item.distance_from_earth_km.toLocaleString()} km
                  </Text>
                </View>
              ) : (
                <>
                  <Text style={styles.infoLabel}>🪐 Distance from Earth: </Text>
                  <Text style={styles.infoValue}>
                    {item.distance_from_earth_km.toLocaleString()} km
                  </Text>
                </>
              )}
            </View>
            <TouchableOpacity
              onPress={() => toggleFavorite(item.id.toString())}
              style={{ position: 'absolute', top: 16, right: 16 }}
            >
              <Text style={{ fontSize: 24 }}>
                {isFavorite(item.id.toString()) ? '❤️' : '🤍'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: '#1a1a1a',
    color: 'white',
    padding: 12,
    margin: 12,
    borderRadius: 12,
    fontSize: 16,
    borderColor: '#333',
    borderWidth: 1,
  },
  filterScrollContainer: {
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    marginRight: 2,
    borderRadius: 20,
    backgroundColor: '#333',
  },
  activeFilterButton: {
    backgroundColor: '#007aff',
  },
  filterText: {
    color: '#aaa',
    fontSize: 14,
    lineHeight: 40,
    paddingBottom: 8,
  },
  activeFilterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  image: {
    height: 180,
    borderRadius: 10,
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  type: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  infoLabel: {
    color: '#aaa',
    fontWeight: 'bold',
  },
  infoValue: {
    color: '#fff',
  },
});
