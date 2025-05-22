import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const format = (num: number, digits: number = 2) =>
  new Intl.NumberFormat('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(num);

type ISSPosition = {
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
};

export default function ISSTrackerLite() {
  const [position, setPosition] = useState<ISSPosition | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [nearestLocation, setNearestLocation] = useState<string | null>(null);
  const [nextPass, setNextPass] = useState<string | null>(null);
  const [crew, setCrew] = useState<string[]>([]);

  const fetchISSPosition = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
      const data = await response.json();
      setPosition({
        latitude: data.latitude,
        longitude: data.longitude,
        altitude: data.altitude,
        velocity: data.velocity,
      });
      setLastUpdated(new Date());
      fetchNearestLocation(data.latitude, data.longitude);
    } catch (err) {
      setError('Failed to fetch ISS position. Check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const fetchNearestLocation = async (lat: number, lon: number) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
      const data = await response.json();
      const city = data.address.city || data.address.town || data.address.village || data.address.county;
      const country = data.address.country;
      setNearestLocation(`${city ? city + ', ' : ''}${country}`);
    } catch (err) {
      setNearestLocation(null);
    }
  };

  const fetchNextPass = async () => {
    try {
      const apiKey = 'Q8CJHU-GKRV7K-K2XA4D-5HHQ';
      const response = await fetch(`https://api.n2yo.com/rest/v1/satellite/visualpasses/25544/55.6761/12.5683/0/1/300/&apiKey=${apiKey}`);
      const data = await response.json();

      if (data.passes && data.passes.length > 0) {
        const next = new Date(data.passes[0].startUTC * 1000);
        setNextPass(next.toLocaleString('en-US'));
      } else {
        setNextPass('No visible passes within the next 5 days.');
      }
    } catch (err) {
      setNextPass('Failed to fetch next visible pass.');
    }
  };

  const fetchCrew = async () => {
    try {
      const response = await fetch('http://api.open-notify.org/astros.json');
      const data = await response.json();
      const issCrew = data.people
        .filter((person: any) => person.craft === 'ISS')
        .map((person: any) => person.name);
      setCrew(issCrew);
    } catch (err) {
      setCrew([]);
    }
  };

  const [tick, setTick] = useState(0); // to trigger re-render every second

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 1000);
    fetchISSPosition();
    fetchNextPass();
    fetchCrew();

    return () => clearInterval(interval);
  }, []);

  const timeSinceLastUpdate = () => {
    if (!lastUpdated) return '';
    const seconds = Math.floor((new Date().getTime() - lastUpdated.getTime()) / 1000);
    return `${seconds} seconds`;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>🛰️ ISS Tracker Lite</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#007aff" />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : position ? (
          <>
            <View style={styles.mapWrapper}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: position.latitude,
                  longitude: position.longitude,
                  latitudeDelta: 40,
                  longitudeDelta: 40,
                }}
                region={{
                  latitude: position.latitude,
                  longitude: position.longitude,
                  latitudeDelta: 40,
                  longitudeDelta: 40,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: position.latitude,
                    longitude: position.longitude,
                  }}
                  title="ISS"
                  description="International Space Station"
                />
              </MapView>

              <TouchableOpacity onPress={fetchISSPosition} style={styles.floatingButton}>
                <Text style={styles.buttonText}>Update Position</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📌 Position</Text>
              <Text style={styles.coord}>🌐 Latitude: {format(position.latitude)}</Text>
              <Text style={styles.coord}>🌐 Longitude: {format(position.longitude)}</Text>
              <Text style={styles.coord}>📏 Altitude: {format(position.altitude)} km</Text>
              <Text style={styles.coord}>💨 Velocity: {format(position.velocity)} km/h</Text>
              {nearestLocation && (
                <Text style={styles.coord}>📍 Nearest location: {nearestLocation}</Text>
              )}
              {lastUpdated && (
                <Text style={styles.coord}>🕒 Last updated: {timeSinceLastUpdate()}</Text>
              )}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🔭 Next Visible Pass</Text>
              <Text style={styles.coord}>Copenhagen: {nextPass}</Text>
            </View>

            {crew.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>👨‍🚀 Crew Onboard</Text>
                {crew.map((member, index) => (
                  <Text key={index} style={styles.coord}>- {member}</Text>
                ))}
              </View>
            )}
          </>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    paddingTop: 64,
    paddingHorizontal: 16,
    alignItems: 'center',
    flexGrow: 1,
  },
  inner: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  positionContainer: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    width: '100%',
  },
  section: {
    backgroundColor: '#1f1f1f',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00bfff',
    marginBottom: 8,
  },
  coord: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 6,
  },
  mapWrapper: {
    position: 'relative',
    width: Dimensions.get('window').width - 32,
    height: 300,
    marginBottom: 16,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 10,
    left: '50%',
    transform: [{ translateX: -100 }],
    backgroundColor: '#007aff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    zIndex: 10,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  crewContainer: {
    marginTop: 10,
  },
});
