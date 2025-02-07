import { useState } from "react";
import { View, Text, Image, Keyboard, Alert } from "react-native";
import { Input } from "@/components/input";
import {
  Calendar as CalendarIcon,
  Settings2,
  UserRoundPlus,
  ArrowRight,
  ClipboardList,
  AtSign,
} from "lucide-react-native";
import { DateData } from "react-native-calendars";
import dayjs, { Dayjs } from "dayjs";

import { colors } from "@/styles/colors";
import { Button } from "@/components/button";
import { Modal } from "@/components/modal";
import { Calendar } from "@/components/calendar";
import { calendarUtils, DatesSelected } from "@/utils/calendarUtils";
import { GuestEmail } from "@/components/email";

enum StepForm {
  TASK_DETAILS = 1,
  ADD_EMAIL = 2,
}

enum MODAL {
  NONE = 0,
  CALENDAR = 1,
  GUESTS = 2
}
export default function Index() {

  const [stepForm, setStepForm] = useState(StepForm.TASK_DETAILS);
  const [selectedDates, setSelectedDates] = useState({} as DatesSelected);
  const [description, setDescription] = useState("");
  const [emailToInvite, setEmailToInvite] = useState("");
   const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);
  
  const [showModal, setShowModal] = useState(MODAL.NONE);
  
  function handleStepNextForm() {
    if (description.trim().length === 0 || !selectedDates.startsAt || !selectedDates.endsAt)  {
      return Alert.alert(
        "Detalhes da tarefa",
        "Por favor, escreva preencha todos os campos"
      );
    }

    if(description.length < 4) {
      return Alert.alert(
        "Detalhes da tarefa",
         "Descrição deve ter pelo menos 4 caracteres"
        )
    }

    if (stepForm === StepForm.TASK_DETAILS) {
      return setStepForm(StepForm.ADD_EMAIL);
    }
  }
  function handleSelectDate(selectedDay:DateData) {
    const dates = calendarUtils.orderStartsAtAndEndsAt({
      startsAt: selectedDates.startsAt,
      endsAt: selectedDates.endsAt,
      selectedDay: selectedDay
    })
    setSelectedDates(dates)
  }

  function handleRemoveEmail(emailToRemove: string) {
    setEmailsToInvite((prevState) =>
      prevState.filter((email) => email !== emailToRemove)
    )
  }
  // function handleAddEmail() {
  //   if (!validateInput.email(emailToInvite)) {
  //     return Alert.alert("Convidado", "E-mail inválido!")
  //   }

  //   const emailAlreadyExists = emailsToInvite.find(
  //     (email) => email === emailToInvite
  //   )

  //   if (emailAlreadyExists) {
  //     return Alert.alert("Convidado", "E-mail já foi adicionado!")
  //   }

  //   setEmailsToInvite((prevState) => [...prevState, emailToInvite])
  //   setEmailToInvite("")
  // }

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
          <Input.Field
          placeholder="Adicione uma tarefa" 
          editable={stepForm === StepForm.TASK_DETAILS} 
          onChangeText={setDescription}
          value={description}
          />
        </Input>

        <Input>
          <CalendarIcon color={colors.zinc[400]} size={20} />
          <Input.Field 
          placeholder="Quando?" 
          editable={stepForm === StepForm.TASK_DETAILS}
          onFocus={() => Keyboard.dismiss()}
          showSoftInputOnFocus={false}
          onPressIn={() => stepForm === StepForm.TASK_DETAILS && setShowModal(MODAL.CALENDAR)}
          value={selectedDates.formatDatesInText}
          />
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
      <Modal 
      title={"Selecionar data"}
      subtitle="Selecione a data de inicio e fim sua próxima tarefa"
      visible={showModal === MODAL.CALENDAR}
      onClose={() => setShowModal(MODAL.NONE)}
      >
        <View className="gap-4 mt-4 ">
          <Calendar 
          onDayPress={date => handleSelectDate(date)} 
          markedDates={selectedDates.dates}
          minDate={dayjs().toISOString()}/>
          <Button onPress={() => setShowModal(MODAL.NONE)}>
            <Button.Title>Confirmar</Button.Title>
          </Button>
        </View>
      </Modal>

      <Modal       
      title={"Selecionar colaborador"}
      subtitle="Os convidados irão receber um e-mail para confirmar a colaboração"
      >
        <View className="my-2 flex-wrap gap-2 border-b border-zinc-800 py-5 items-start">
          {emailsToInvite.length > 0 ? (
            emailsToInvite.map((email) => (
              <GuestEmail
                key={email}
                email={email}
                onRemove={() => handleRemoveEmail(email)}
              />
            ))
          ) : (
            <Text className="text-zinc-600 text-base font-regular">
              Nenhum e-mail adicionado.
            </Text>
          )}
        </View>

        <View className="gap-4 mt-4">
          <Input variant="secondary">
            <AtSign color={colors.zinc[400]} size={20} />
            <Input.Field
              placeholder="Digite o e-mail do convidado"
              keyboardType="email-address"
              onChangeText={(text) => setEmailToInvite(text.toLowerCase())}
              value={emailToInvite}
              returnKeyType="send"
              
            />
          </Input>

          <Button>
            <Button.Title>Convidar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  );
}
