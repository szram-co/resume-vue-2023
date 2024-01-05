# resume-vue-2023

![Latest Deployment Status](https://github.com/szram-co/resume-vue-2023/actions/workflows/firebase-hosting-merge.yml/badge.svg?branch=main&event=push)

This template is designed to help you start developing with Vue 3 in Vite. It includes TypeScript configuration and
integration with tools like ESLint and Prettier.

**Live Preview:** [https://resume.szram.co/](https://resume.szram.co/)

## Recommended setup

- [Node Version Manager](https://github.com/nvm-sh/nvm) for use correct versions of node and npm
- [Vite](https://vitejs.dev/) for _development environment that can finally catch up with you_
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).
  TypeScript does not natively support type information for `.vue` imports, so we replace the `tsc` CLI with `vue-tsc`
  for
  type checking. In editors, we need
  the [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
  to make the TypeScript language service aware of `.vue` types.

## Configure

1. [Install NVM](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)
2. Setup Node `nvm install 20`, set as default `nvm alias default 18`
3. Setup NPM `npm i -g npm`

# Project Setup

Install locked dependencies `npm ci`.

Run dev server `npm start`

## Scripts

| Script       | Description                                        |
|--------------|----------------------------------------------------|
| `start`      | Starts the Vite development server.                |
| `preview`    | Launches a preview of the application.             |
| `build`      | Runs type-checking and compilation for production. |
| `build-only` | Compiles the application using Vite.               |
| `format`     | Formats code using Prettier.                       |
| `lint`       | Runs ESLint for project files.                     |
| `type-check` | Runs `vue-tsc` for type-checking.                  |
| `deploy`     | Builds the application and deploys it to Firebase. |
