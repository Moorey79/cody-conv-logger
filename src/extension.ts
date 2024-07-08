import { ConversationLogger } from './utils/logger';
import * as vscode from 'vscode';
import { debounce } from 'lodash';

class ConversationLogger {
    private static instance: ConversationLogger;

    private constructor() {}

    public static getInstance(): ConversationLogger {
        if (!ConversationLogger.instance) {
            ConversationLogger.instance = new ConversationLogger();
        }
        return ConversationLogger.instance;
    }

    private disposables: vscode.Disposable[] = [];

public dispose() {
    this.disposables.forEach((disposable) => disposable.dispose());
    this.disposables = [];
}

    public setupEventListeners(context: vscode.ExtensionContext) {
        const debouncedLogConversation = debounce(this.logConversation, 500);
        console.log('Cody Conversation Logger: Setting up event listener');
        const disposable = vscode.window.onDidChangeTextEditorSelection((event) => {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                const selectedText = editor.document.getText(editor.selection);
                debouncedLogConversation(selectedText);
            }
        });
        context.subscriptions.push(disposable);
        this.disposables.push(disposable);
    }

    private logConversation(text: string) {
        // Log the conversation text
        console.log(`Conversation text: ${text}`);
        const outputChannel = vscode.window.createOutputChannel('Cody Conversation Logger');
        outputChannel.appendLine(`Conversation text: ${text}`);
    }
}

export function activate(context: vscode.ExtensionContext) {
    console.log('Cody Conversation Logger: Extension activated');
    const logger = ConversationLogger.getInstance();
    logger.setupEventListeners(context);
}

export function deactivate() {
    ConversationLogger.getInstance().dispose();
      // Set up event listeners to capture conversation data
    // Example: Listen for the 'onDidChangeTextEditorSelection' event
    const disposable = vscode.window.onDidChangeTextEditorSelection((event) => {
        // Capture the conversation text and call logger.logConversation()
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const conversationText = editor.document.getText();
            logger.logConversation(conversationText);
        }
    });

    context.subscriptions.push(disposable);
}


