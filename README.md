
# TypeScript Monorepo Example

This is just a quick example of how you can setup VS Code to work with a [Lerna](https://lerna.js.org/) monorepo, along with working examples of:

* [Mocha tests](https://mochajs.org/)
* [Chai assertion library](https://www.chaijs.com/)
* [Sinon spies](https://sinonjs.org/)
* [ESlint](https://eslint.org/)

Effectively, this is what I wish I had when I first got started and it is my hope to save anyone else some frustration.

## Project Structure

### packages/app

A semi-functional, contrived TypeScript application based on two Lerna dependencies:

* packages/url-fetch
* packages/eslint-config-typescript

### packages/url-fetch
An example TypeScript dependency that's purpose is to fetch webpage with a redirect and return the new url.

### packages/eslint-config-typescript
An example dependency that's contain a common set of TypeScript [ESlint](https://eslint.org/) configuration that extends and overrides the package [eslint-config-airbnb-typescript](https://www.npmjs.com/package/eslint-config-airbnb-typescript) so that each Lerna package does not have to have its .eslint.yaml be separately maintained.


## Getting started

### Install Lerna

Install [Lerna](https://lerna.js.org/) globally.

```
npm install --global lerna
```

### Install Yarn

Install [Yarn](https://classic.yarnpkg.com/en/docs/install#mac-stable) globally.

```
npm install --global yarn
```

### Clone this package locally

```
git clone https://github.com/abd1tus/typescript-monorepo-example.git
```

### bootstrap Lerna

```
cd typescript-monorepo-example
lerna bootstrap
```
### Run tests on all packages with the command line
```
cd typescript-monorepo-example
yarn test
```

### Lint all packages with the command line
```
cd typescript-monorepo-example
yarn lint
```

### Build all packages with the command line
```
cd typescript-monorepo-example
yarn build
```

### Publishing with Lerna

The beauty behind Lerna is its ability make editing interdependent pacakges together much easier by automaticallically updating package versions for you as needed, as well as commiting those changes to git, and publishing to npm (or other, if configured).

```
cd typescript-monorepo-example
yarn build
```

Note, packages in the project are marked as private in package.json so that they cannot be accidentially pubshed to npmjs.com (or any others).  In your own project you may want to choose to leave some packages public, and others marked as private that do not need to be pacakged - such as AWS lambda funcitons that don't get re-used anywhere.


## Working with a Lerna monorpo in VS Code

The ```lerna bootstrap``` command sets up symbolic links between packages so that updates to one package (after a build) can be seen by other packages without the need to push to git or re-deploy custom npm packages.

### Loading the workspace in VS Code

In VS Code, using File -> Open Workspace... open the file ```typescript-monorepo-example/workspace.code-workspace``` found in the project root.  This will create separate directories within the VS Code workspace window.  If the entire typescript-monorepo-example repo was loaded as a single folder within VS Code then problems occur with parsing and working with the ESlint files.  (If anyone knows a workaround for this, please contact me so I can update this example.)


### tcs watch task
One of the problems I've run into with VS Code is it won't show you errors in files that aren't open, especially in monorepos.  A way around this is to run tsc watch tasks, which will compile code automatically when changes occur, even across packages, and highlight errors.  tsc watch tasks are included in tin ```.vscode/tasks.json``` in the package folders.   

Note: these watch tasks have to be started manually once the workspace is loaded.  However, they are configured with ```"runOn": "folderOpen"```,  so  running ```Tasks: Allow Automatic Tasks in Folder``` from the command palette will allow them to launch anytime the project is opened without needing to manually start them.

### ESLint

Make sure the [ESLint plugin](https://github.com/Microsoft/vscode-eslint) is installed in VS Code.

### Optional Plugins

[Material Icon Theme](https://github.com/PKief/vscode-material-icon-theme.git) makes looking at workspaces nicer.


### Debugging

Debugger configurations are setup for ```packages/app``` and ```packages/url-fetch``` so that debugging can be run from VS Code during tests.  Unfortunately a limitation of having ```packages/app``` and ```packages/url-fetch``` be open across separate VS Code folders within a workspace is that you cannot debug from one package to another, so focused tests should be written in each package as needed.  These debugger configurations can be found in ```.vscode/launch.json``` in the package folders.


## Other cool things to do with lerna

The entire use of Lerna is beyond the scope of this project, but here are some cool highlights:

### Remove a file from all packages in parallel
```
lerna exec --parallel -- rm bad-file.txt
```

### Remove a file from all packages in parallel
```
lerna exec --parallel -- rm bad-file.txt
```

### Find outdated packages ordered by dependency usage
```
lerna exec -- yarn outadted
```

### Find packages with security vulnerabilities
(Note this won't work on this repo since its packages are not published in [npm](https://www.npmjs.com/).)
```
lerna exec -- yarn audit
```
