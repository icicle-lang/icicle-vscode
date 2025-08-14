## Installation

Once you're happy with the changes, package the extension into a .vsix file ready to installed more permanently into VSCode. Use the following commands from the root of the extension source directory. The vsce package is the VSCode Extension management command line tool.

```bash
> npm install vsce
> npm run compile
> node_modules/.bin/vsce package
> code --install-extension ./salt-vscode-XX.XX.XX.vsix
```
