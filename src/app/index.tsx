import { View, Text, Image } from "react-native";
import { Input } from "@/components/input";
import {
  MapPin,
  Calendar as CalendarIcon,
  Settings2,
  UserRoundPlus,
  ArrowRight,
} from "lucide-react-native";
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <Image
        source={require("@/assets/logo.png")}
        className="h-8"
        resizeMode="contain"
      />
      <Text className="text-zinc-400 font-regular text-center text-lg mt-3">
        Planeje suas tarefas
      </Text>
      <View className="w-full bg-zin-900 p-4 rounded-xl my-8 border border-zinc-800">
        <Input>
          <MapPin color={colors.zinc[400]} size={20} />
          <Input.Field placeholder="Para onde?" />
        </Input>

        <Input>
          <CalendarIcon color={colors.zinc[400]} size={20} />
          <Input.Field placeholder="Quando?" />
        </Input>

        <View className="border-b py-3 border-zinc-800">
          <Button variant="secondary">
            <Button.Title>Alterar</Button.Title>
            <Settings2 color={colors.zinc[200]} size={20}></Settings2>
          </Button>
        </View>

        <Input>
          <UserRoundPlus color={colors.zinc[400]} size={20} />
          <Input.Field placeholder="Quais alunos?" />
        </Input>

        <Button>
            <Button.Title>Continuar</Button.Title>
            <ArrowRight color={colors.lime[950]} size={20}/>
        </Button>
      </View>
        <Text className="text-zinc-500 font-regular text-center text-base">
            Ao continuar utilizando o FIAP Planner, você automaticamente concorda com nossos{" "}
            <Text className="text-zinc-200 underline">
                termos de uso e politicas de privacidade.
            </Text>
        </Text>
    </View>
  );
}
