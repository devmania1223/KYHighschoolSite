module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            transitionProperty: {
                "spacing": "margin, padding",
            },
            keyframes: {
                "load": {
                    "0%": { opacity: 0 },
                    "100%": { opacity: 1 }
                }
            },
            animation: {
                "load": "load 300ms ease-in-out 1"
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
