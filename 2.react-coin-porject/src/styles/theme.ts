import { DefaultTheme } from "styled-components";

declare module 'styled-components' {
    export interface DefaultTheme {
        bgColor: string,
        textColor: string,
        accentColor: string,
    }
}

export const darkTheme: DefaultTheme = {
    bgColor: "#2d3436",
    textColor: "#dfe6e9",
    accentColor: "#6c5ce7",
}

export const lightTheme: DefaultTheme = {
    bgColor: "whitesmoke",
    textColor: "black",
    accentColor: "#6c5ce7",
}

