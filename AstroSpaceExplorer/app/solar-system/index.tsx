import { FlatList, Image, Pressable, Text, View } from "react-native"
import { useRouter } from "expo-router"
import { solarSystemObjects } from "@/lib/solarSystemObjects"

export default function SolarSystemExplorer() {
  const router = useRouter()

  return (
    <View className="flex-1 p-4 bg-black">
      <Text className="text-white text-xl mb-4">Solar System Explorer</Text>
      <FlatList
            horizontal
            data={solarSystemObjects}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <Pressable
                onPress={() => router.push({ pathname: "/solar-system/[planetId]", params: { planetId: item.id } })}
                className="mr-4 items-center"
                >
                <Image source={item.image} style={{ width: 100, height: 100 }} />
                <Text className="text-white mt-2">{item.name}</Text>
                </Pressable>
            )}
            showsHorizontalScrollIndicator={false}
        />
    </View>
  )
}
