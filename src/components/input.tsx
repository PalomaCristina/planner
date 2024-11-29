import clsx from "clsx"
import { ReactNode } from "react"
import { View, TextInput, TextInputProps } from "react-native"

type Variants = "primary" | "secondary" | "tertiary"

type InputProps = {
    children: ReactNode,
    variant?: Variants,
}
function Input({children, variant = "primary"}: InputProps) {
    return <View className={clsx(
        "w-full h-16 flex-row items-center gap-2",
        {"h-14 px-4 rounded-lg border border-zinc-800" : variant != "primary"},
        {"bg-zinc-950" : variant === "secondary"},
        {"bg-zinc-900" : variant != "tertiary"},
    )}>{children}</View>
}

function Field({...rest } : TextInputProps) {//faço essa atribuição de parãmetro que na verdade é uma tipagem para que a função tenha todas as propriedades reservadas daquele componente que eu quero...
    //utilizo o {...rest} para ele pegar todas as propriedades que não foram atribuidas explicitamente
    return <TextInput className="flex-1 text-zinc-100 text-lg font-regular"/>
}

Input.Field = Field

export { Input }