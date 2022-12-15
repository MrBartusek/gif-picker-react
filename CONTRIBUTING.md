# Contributing

Thank you for investing your time in contributing to our project! Any contribution you
make will be reflected on the next release of gif-picker-react.

## How to report bugs and propose new features

If you spot a problem in the project or want to propose a improvement or new integration
to the project. [Search if an issue already exists](https://github.com/MrBartusek/gif-picker-react/issues).
If a related issue doesn't exist, you can [open a new issue](https://github.com/MrBartusek/gif-picker-react/issues/new/choose).

## Setup local environment

If you don't have gif-picker-react running locally please follow this setup guide.

1. Install newest LTS release of [Node.js](https://nodejs.org/en/), it has NPM package
   manager bundled with it.
1. Generate a Tenor API key if you don't have one yet. The specific instructions are
   described in [`README.md`](README.md)
1. Fork this repository using [Fork](https://github.com/MrBartusek/gif-picker-react/fork)
   button. This will create a new repository on your account named `<your username>/gif-picker-react`
1. Clone this repo to wherever you want:
   ```sh
   git clone https://github.com/<your username>/gif-picker-react.git
   ```
1. Go into the repo folder:
   ```sh
   cd gif-picker-react
   ```
1. Install dependencies (Node.js and npm are required):
   ```sh
   npm install
   ```
1. Create a new file in root of the repository named `.env`, you can alternatively do this
   via environmental variables.
1. Populate this file with your api key in following format:
    ```ini
    STORYBOOK_TENOR_TOKEN="YOUR_API_TOKEN"
    ```
1. Run storybook server. It is a tool running in your browser that will allow you to easily
   preview your changes.
   ```sh
   npm run storybook
   ```

After successfully following this guide you should have a website running on your local machine.
This is a storybook server which is a tool that will allow you to easily work on the library.

## How to contribute

1. Fork the project and clone it to your local machine. Follow the [setup guide](#setup-local-environment).
1. Before making any changes pull from the remote repository to update your main branch
   ```sh
      git pull upstream master
   ```
1. Create a branch on which you will be working.
   ```sh
       git checkout -b update-header-color
   ```
1. Commit your changes and push it to your fork of the repository.
1. Make sure your changes are working locally. Run `npm run build` to check code style.
1. Create a Pull Request (PR). Make sure to describe the changes that you made and use
   the `Fixes: #number` keyword if you were working on a issue.
