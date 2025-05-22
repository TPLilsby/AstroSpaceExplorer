import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { spaceFacts } from '@/lib/spaceFactObjects';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const todayIndex = new Date().getDate() % spaceFacts.length;
  const todayFact = spaceFacts[todayIndex];
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const bgPulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(bounceAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(bgPulse, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(bgPulse, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const ctaBackground = bgPulse.interpolate({
    inputRange: [0, 1],
    outputRange: ['#222', '#333'],
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.Text
        style={[
          styles.title,
          {
            opacity: fadeAnim,
            transform: [
              {
                scale: bounceAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1],
                }),
              },
            ],
          },
        ]}
      >
        🚀 AstroSpace Explorer ✨
      </Animated.Text>

      <View style={styles.factContainer}>
        <Text style={styles.factTitle}>📅 Today's Space Fact</Text>
        <Text style={styles.factHeader}>{todayFact.title}</Text>
        <Text style={styles.factText}>{todayFact.description}</Text>
      </View>

      <View style={styles.introContainer}>
        <Text style={styles.introText}>
          Welcome to AstroSpace Explorer! Discover space, follow the International Space Station, and learn amazing things about the universe.
        </Text>
        <Text style={styles.introText}>
          Each day brings a new fact — but that's only the beginning of your journey.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/explore-iss')}
        >
          <Text style={styles.buttonText}>🛰 Go to ISS Tracker</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/astrodex')}
        >
          <Text style={styles.buttonText}>📖 Go to AstroDex Mini</Text>
        </TouchableOpacity>
      </View>

      <Animated.View style={[styles.ctaContainer, { backgroundColor: ctaBackground }]}>
        <Text style={styles.ctaText}>🌌 Keep exploring the universe!</Text>
        <Text style={styles.ctaHint}>Tap a feature above to begin your mission 🚀</Text>
      </Animated.View>

      <Text style={styles.footer}>💡 Did you know? The ISS orbits Earth every 90 minutes!</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flexGrow: 1,
    alignItems: 'center',
    padding: 24,
    paddingTop: 64,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
    textAlign: 'center',
  },
  factContainer: {
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 10,
    marginBottom: 24,
    width: '100%',
  },
  factTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e90ff',
    marginBottom: 8,
  },
  factHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  factText: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 4,
  },
  introContainer: {
    marginBottom: 24,
    width: '100%',
    gap: 8,
  },
  introText: {
    fontSize: 15,
    color: '#aaa',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#1e90ff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  ctaContainer: {
    marginTop: 16,
    padding: 16,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  ctaText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  ctaHint: {
    fontSize: 14,
    color: '#bbb',
    marginTop: 4,
    textAlign: 'center',
  },
  footer: {
    marginTop: 28,
    color: '#888',
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
