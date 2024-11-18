import "@/styles/global.css"

import { View, StatusBar, _View } from "react-native"
import { Slot } from "expo-router"

export default function Layout(){
    return (
        <View className="flex-1 bg-zinc-950">
            <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent={true}
            />
            <Slot/>
        </View>

)}