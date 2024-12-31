module.exports = {
    extends: [
        "next/core-web-vitals",
        "plugin:jsx-a11y/recommended", // Accessibility checks
        "eslint:recommended", // General JavaScript recommendations
    ],
    rules: {
        "no-unused-vars": "warn", // Example: Customize rules
        "react/jsx-sort-props": "off", // Turn off unnecessary rules
        "valid-typeof": "off",
        "no-constant-binary-expression": "off"

    },
};

