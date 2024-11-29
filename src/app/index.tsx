import { View, Text, Image } from "react-native";
import { Input } from "@/components/input";

export default function Index(){
    return (
        <View className="flex-1 items-center justify-center px-5">
        <Image 
        source={require("@/assets/logo.png")} 
        className="h-8"
        resizeMode="contain"
        />
        <Text className="text-zinc-400 font-regular text-center text-lg mt-3">
            Convide seus amigos e planeje {"\n"} sua próxima viagem!
        </Text>
        <View className="w-full bg-zin-900 p-4 rounded-xl my-8 border border-zinc-800">
            <Input>
            <Input.Field placeholder="Para onde?"/>
            </Input>
        </View>
        </View>
)
}