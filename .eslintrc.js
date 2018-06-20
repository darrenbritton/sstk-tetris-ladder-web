module.exports = {
    "env": {
        "browser": true,
        "jasmine": true
    },
    "parser": "babel-eslint",
    "extends": "airbnb",
    "rules": {
        "strict": 0,
        "import/extensions": 0,
        "react/prefer-stateless-function": 0,
        "react/jsx-filename-extension": 0,
        "react/prop-types": 0,
        "jsx-a11y/anchor-is-valid": 0,
        "no-underscore-dangle": ["error", { "allow": ["__REDUX_DEVTOOLS_EXTENSION__"] }]
    }
};