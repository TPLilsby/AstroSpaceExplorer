import { Text, View, Image } from "react-native"
import { useLocalSearchParams } from "expo-router"
import { solarSystemObjects } from "@/lib/solarSystemObjects"

export default function PlanetDetail() {
  const { planetId } = useLocalSearchParams()
  const planet = solarSystemObjects.find((p) => p.id === planetId)

  if (!planet) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-white">Planet not found</Text>
      </View>
    )
  }

  return (
    <View className="flex-1 p-6 bg-black">
      <Text className="text-white text-2xl mb-4">{planet.name}</Text>
      <Image source={planet.image} style={{ width: 200, height: 200 }} />
      <Text className="text-white mt-4">{planet.description}</Text>
      <Text className="text-blue-300 mt-2 italic">Fun Fact: {planet.fact}</Text>
    </View>
  )
}
