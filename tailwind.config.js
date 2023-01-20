/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: ["right-16", "left-16"],
    theme: {
        extend: {
            backgroundImage: {
                modular:
                    "url('../public/assets/backgrounds/modular-side-dark.jpg')",
                table: "url('../public/assets/backgrounds/table-top.jpeg')",
                woodFloor:
                    "url('../public/assets/backgrounds/wood-floor.jpeg')",
            },
            scale: {
                85: ".85",
            },
            minHeight: {
                dialog: "100px",
            },
            minWidth: {
                formSubmitButton: "324px",
                dialogButton: "152px",
                dialogSubmitButton: "252px",
                deviceIconWidth: "180px",
            },
            boxShadow: {
                "3xl": "0 0 26px 11px #383b43",
            },
            width: {
                double: "200%",
            },
            transitionProperty: {
                height: "height",
            },
            height: {
                accountAvatar: "632px",
            },
        },
        colors: {
            primary: "#383B43",
            "primary-light": "#ECE7E7",
            "light-gray": "#9498A0",
            error: "#FF0000",
            "primary-light-border": "#cbbdbd",
            transparent: "transparent",
            fieldLabel: "#8A8A8A",
        },
        fontFamily: {
            default: ["SairaCondensed-Thin", "sans-serif"],
            regular: ["SairaCondensed-Regular", "sans-serif"],
            black: ["SairaCondensed-Black", "sans-serif"],
            extraBold: ["SairaCondensed-ExtraBold", "sans-serif"],
            extraLight: ["SairaCondensed-ExtraLight", "sans-serif"],
            light: ["SairaCondensed-Light", "sans-serif"],
            medium: ["SairaCondensed-Medium", "sans-serif"],
            semiBold: ["SairaCondensed-SemiBold", "sans-serif"],
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
