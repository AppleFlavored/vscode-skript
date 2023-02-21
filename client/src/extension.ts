import { join } from 'path';
import { ExtensionContext } from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from 'vscode-languageclient/node';

let client: LanguageClient;

export async function activate(context: ExtensionContext) {
    const serverModule = context.asAbsolutePath(
        join('server', 'out', 'server.js')
    );

    const serverOptions: ServerOptions = {
        run: { module: serverModule, transport: TransportKind.ipc },
        debug: { module: serverModule, transport: TransportKind.ipc }
    };

    const clientOptions: LanguageClientOptions = {
        documentSelector: [{ scheme: 'file', language: 'skript' }],
    };

    client = new LanguageClient(
        'skriptLanguageServer',
        'Skript Language Server',
        serverOptions,
        clientOptions
    );

    await client.start();
}

export function deactivate(): Thenable<void> {
    return client.stop() ?? undefined;
}