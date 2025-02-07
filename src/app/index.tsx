import { View, Text, Image } from "react-native";
import { Input } from "@/components/input";
import {
  MapPin,
  Calendar as CalendarIcon,
  Settings2,
  UserRoundPlus,
  ArrowRight,
  ClipboardList,
} from "lucide-react-native";
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";
import { useState } from "react";

enum StepForm {
  TASK_DETAILS = 1,
  ADD_EMAIL = 2,
}

export default function Index() {
  const [stepForm, setStepForm] = useState(StepForm.TASK_DETAILS);

  function handleStepNextForm() {
    if (stepForm === StepForm.TASK_DETAILS) {
      return setStepForm(StepForm.ADD_EMAIL);
    }
  }
  return (
    <View className="flex-1 items-center justify-center px-5">
      <Image
        source={require("@/assets/logo.png")}
        className="h-8"
        resizeMode="contain"
      />
      <Image source={require('@/assets/bg.png')} className="absolute"></Image>
      <Text className="text-zinc-400 font-regular text-center text-lg mt-3">
        Planeje suas tarefas
      </Text>
      <View className="w-full bg-zin-900 p-4 rounded-xl my-8 border border-zinc-800">
        <Input>
          <ClipboardList color={colors.zinc[400]} size={20} />
          <Input.Field placeholder="Adicione uma tarefa" editable={stepForm === StepForm.TASK_DETAILS} />
        </Input>

        <Input>
          <CalendarIcon color={colors.zinc[400]} size={20} />
          <Input.Field placeholder="Quando?" editable={stepForm === StepForm.TASK_DETAILS}/>
        </Input>
        
        {stepForm === StepForm.ADD_EMAIL && (
          <>
            <View className="border-b py-3 border-zinc-800">
              <Button
                variant="secondary"
                onPress={() => {
                  setStepForm(StepForm.TASK_DETAILS);
                }}
              >
                <Button.Title>Alterar</Button.Title>
                <Settings2 color={colors.zinc[200]} size={20}></Settings2>
              </Button>
            </View>

            <Input>
              <UserRoundPlus color={colors.zinc[400]} size={20} />
              <Input.Field placeholder="Convidar colaborador" />
            </Input>
          </>
        )}
        <Button onPress={handleStepNextForm}>
          <Button.Title>
            {
            stepForm === StepForm.TASK_DETAILS 
            ? "Continuar"
            : "Confirmar Tarefa"
            }</Button.Title>
          <ArrowRight color={colors.lime[950]} size={20} />
        </Button>
      </View>
      <Text className="text-zinc-500 font-regular text-center text-base">
        Ao continuar utilizando o FIAP Planner, você automaticamente concorda
        com nossos{" "}
        <Text className="text-zinc-200 underline">
          termos de uso e politicas de privacidade.
        </Text>
      </Text>
    </View>
  );
}
