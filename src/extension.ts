
import * as vscode   from 'vscode';
import * as vsclient from 'vscode-languageclient';

export function activate(context: vscode.ExtensionContext) {

        // Get the server path from the config.
        let cfgServerPath: string | undefined
                = vscode.workspace.getConfiguration('icicle').get('server.executable');

        let serverPath: string
                = ("" + cfgServerPath) === ""
                        ? 'icicle'
                        : "" + cfgServerPath;

        // Get the debug log from the config, if it's set.
        let cfgDebugLog: string | undefined
                = vscode.workspace.getConfiguration('icicle').get('trace.debug');

        let args: string[]
                =  ("" + cfgDebugLog) === ""
                        ? ['lsp']
                        : ['lsp', '--debug-path', "" + cfgDebugLog];

        // Start the language server.
	let serverOptions: vsclient.ServerOptions = {
		run:   { command: serverPath, args: args },
		debug: { command: serverPath, args: args }
	};

	let clientOptions: vsclient.LanguageClientOptions = {
		documentSelector: ['icicle'],
		synchronize: {
			configurationSection: 'icicle',
			fileEvents: vscode.workspace.createFileSystemWatcher('**/.iciclerc')
		}
	};

	let dClient = new vsclient.LanguageClient(
		'icicle',
		'Icicle Language Server',
		serverOptions,
		clientOptions).start();
	context.subscriptions.push(dClient);
}

export function deactivate() {}
