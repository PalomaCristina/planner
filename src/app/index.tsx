import { View, Text, Image } from "react-native";
import clsx  from "clsx";
import { Input } from "@/components/input";

export default function Index(){
    return (
        <View className="flex-1 items-center justify-center">
        <Image 
        source={require("@/assets/logo.png")} 
        className="h-8"
        resizeMode="contain"
        />
        <Text className="text-zinc-400 font-regular text-center text-lg mt-3">
            Convide seus amigos e planeje {"\n"} sua próxima viagem!
        </Text>
        <View>
            <Input>
            <Input.Field placeholder="Para onde?"/>
            </Input>
        </View>
        </View>

        

)
}