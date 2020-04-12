# GithubScraper

Sample React application for listing github account profiles and their repositories 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Recommended environment

Recommended machine for running the project:
- Windows 10 environment (64-bit) + >=8GB RAM machine
- NodeJS >=10.16.0 (npm >=6.9.0)
- modern high-end code editor (Jetbrains WebStorm, Intellij or Microsoft Visual Studio/Code)

## Setup

Requires a GitHub token to run, to create new one check out the 
guide [here](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).\
The token must be placed inside this project as REACT_APP_GITHUB_TOKEN environment variable in order to run.

You can add this environment variable:
- when running the start script or in editor configuration (e.g. WebStorm run config),
- by adding an .env.local file with your GitHub token like this: `REACT_APP_GITHUB_TOKEN=token_goes_here`

Additionally, if you don't like the app to open automatically in your default browser,\
you can add `BROWSER=none` into your variables and then open it manually in the browser of your choice.

Finally, run `npm run generate` npm script to generate to proper files.

## Available Scripts

In the project directory, you can run:

### `npm run generate`

Generates types required for GitHub graphql API. 

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run coverage`

Outputs test coverage report.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Keywords

apollo-boost, graphql, github-graphql-api-v4, react, react-hooks, typescript
