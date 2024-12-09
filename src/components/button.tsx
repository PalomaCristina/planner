import { Text, TextProps, TouchableOpacity, TouchableOpacityProps } from "react-native";

type Variants = "primary" | "secondary";

type ButtonPropos = TouchableOpacityProps & {//essa variavel está recebendo todas as propriedades que existem dentro de TouchableOpacity + (&) as que eu irei definir
    variant?: Variants
    isLoading?: boolean
}
function Button({variant = "primary", isLoading, children, ...rest} : ButtonPropos){
    return <TouchableOpacity {...rest}>{children}</TouchableOpacity>

}

function Title({ children} : TextProps){
    return <Text>{children}</Text>
}

Button.Title = Title

export { Button }