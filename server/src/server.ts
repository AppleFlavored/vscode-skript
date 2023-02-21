import { TextDocument } from 'vscode-languageserver-textdocument';
import { CompletionItem, CompletionItemKind, createConnection, InitializeParams, InitializeResult, ProposedFeatures, TextDocumentPositionParams, TextDocuments, TextDocumentSyncKind } from 'vscode-languageserver/node';

const connection = createConnection(ProposedFeatures.all);
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

connection.onInitialize((params: InitializeParams) => {
    const result: InitializeResult = {
        capabilities: {
            textDocumentSync: TextDocumentSyncKind.Incremental,
            completionProvider: {
                resolveProvider: true
            }
        }
    };

    return result;
});

connection.onCompletion((_position: TextDocumentPositionParams): CompletionItem[] => {
	return [{ label: 'Thing', kind: CompletionItemKind.Text, detail: 'This is a thing!' }];
});

connection.onCompletionResolve((item: CompletionItem): CompletionItem => {
    return item;
});

documents.listen(connection);
connection.listen();