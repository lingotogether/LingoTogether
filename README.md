# LingoTogether

## Description

The English teaching site.
Built with React.js
Deployed to firebase

## Prerequisites

**firebase**:

How to set up firebase CLI for hosting, via https://firebase.google.com/docs/hosting/quickstart

## Installation

### How to run the project locally

1. `git clone <REPO_URL>` or download the project locally
2. Run `yarn install` to install the project dependencies
3. Add `.env` file to root directory (https://docs.google.com/document/d/10M1QTKosiquG7YhIo3FgfoQevj9x2VHexdBwrkH4Xnk/edit?usp=sharing)
4. `yarn start` to run the project

## Deployment

### Staging

When the commits is pushed to `master` branch, it will automatically deploy to Heroku for staging and testing purpose.
(via https://lingotogether.herokuapp.com)

### Production

1. Run `yarn build` to compile the project
2. Run `firebase deploy` to deploy the project to production


## Available Scripts

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
