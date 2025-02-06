import { createContext, useContext } from "react";
import { ActivityIndicator, Text, TextProps, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { clsx } from "clsx";

type Variants = "primary" | "secondary";

type ButtonPropos = TouchableOpacityProps & {//essa variavel está recebendo todas as propriedades que existem dentro de TouchableOpacity + (&) as que eu irei definir
    variant?: Variants
    isLoading?: boolean
}

const ThemeContext = createContext<{variant?: Variants}>({})
function Button({variant = "primary", isLoading, children, ...rest} : ButtonPropos){
    return <TouchableOpacity className={
        clsx(
            "w-full h-11 flex-row items-center justify-center rounded-lg gap-2",
            {                
                "bg-lime-300" : variant === "primary",
                "bg-zinc-800" : variant === "secondary",
            }
        )}
    activeOpacity={0.7}
    disabled={isLoading}
    {...rest}
    >
    <ThemeContext.Provider value={{variant}}>
        { isLoading ? <ActivityIndicator/> : children}
    </ThemeContext.Provider>    
    </TouchableOpacity>

}   

function Title({ children} : TextProps){
    const { variant } = useContext(ThemeContext);
    return <Text className={clsx("text-base font-semibold", {
        "text-lime-950" : variant === "primary", 
        "text-zinc-200" : variant === "secondary"
    })}>{children}</Text>
}

Button.Title = Title

export { Button }