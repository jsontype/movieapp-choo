# npm

"start": "react-scripts start",
"build": "react-scripts build",
"test": "react-scripts test",
"eject": "react-scripts eject",
"format": "prettier --check --ignore-path .gitignore .",
"format:fix": "prettier --write --ignore-path .gitignore .",
"lint": "eslint ./src",
"lint:fix": "eslint --fix ./src",
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
