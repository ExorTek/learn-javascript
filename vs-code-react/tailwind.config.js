module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                yellow_vs: "#D9E577",
                blue_vs: "#389fdc",
                lightblue_vs: "#85d8fb",
                brown_vs: "#d98e73",

            },
        },
        screens: {
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
        },
    },
    plugins: [],
}
