import { extendTheme } from "@chakra-ui/react";

const primary = "#383B43";
const primaryLight = "#ECE7E7";

export const theme = extendTheme({
    fonts: {
        default: "SairaCondensed-Thin, sans-serif",
        regular: "SairaCondensed-Regular, sans-serif",
        black: "SairaCondensed-Black, sans-serif",
        extraBold: "SairaCondensed-ExtraBold, sans-serif",
        extraLight: "SairaCondensed-ExtraLight, sans-serif",
        light: "SairaCondensed-Light, sans-serif",
        medium: "SairaCondensed-Medium, sans-serif",
        semiBold: "SairaCondensed-SemiBold, sans-serif",
    },
    shadows: {
        primary: `0 0 0 1px ${primary}`,
    },
    components: {
        Button: {
            variants: {
                primary: {
                    color: primaryLight,
                    backgroundColor: primary,
                },
                ghost: {
                    backgroundColor: "transparent",
                    border: "none",
                },
            },
            baseStyle: {
                cursor: "pointer",
            },
            sizes: {
                "2xl": {
                    h: "132px",
                    fontSize: "2xl",
                    px: "52px",
                },
            },
        },
        IconButton: {
            baseStyle: {
                cursor: "pointer",
            },
        },
    },
    colors: {
        brand: {
            primary: "#383B43",
            "primary-light": "#ECE7E7",
            "light-gray": "#9498A0",
            error: "#FF0000",
            "primary-light-border": "#cbbdbd",
            transparent: "transparent",
            fieldLabel: "#8A8A8A",
            warning: "#e4980c",
            success: "#13ae13",
        },
        dark: {
            50: "#f7f7f7",
            100: "#e0e0e1",
            200: "#c5c5c8",
            300: "#a4a6a9",
            400: "#929498",
            500: "#7b7d82",
            600: "#67696f",
            700: "#52545b",
            800: "#44474f",
            900: "#31333a",
        },
        red: {
            50: "#FCE0E4",
            100: "#F9CAD1",
            200: "#F49EAB",
            300: "#F07185",
            400: "#EB455F",
            500: "#E61939",
            600: "#BA142E",
            700: "#8E0F23",
            800: "#610B18",
            900: "#35060D",
        },
    },
});
