import { ReactNode } from "react"
import { View, TextInput } from "react-native"

type Variants = "primary" | "secondary" | "tertiary"

type InputProps = {
    children: ReactNode,
    variant?: Variants,
}
function Input({children, variant = "primary"}: InputProps) {
    return <View>{children}</View>
}

function Field() {
    return <TextInput/>
}

Input.Field = Field

export { Input }