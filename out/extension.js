"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const lodash_1 = require("lodash");
class ConversationLogger {
    constructor() {
        this.disposables = [];
    }
    static getInstance() {
        if (!ConversationLogger.instance) {
            ConversationLogger.instance = new ConversationLogger();
        }
        return ConversationLogger.instance;
    }
    dispose() {
        this.disposables.forEach((disposable) => disposable.dispose());
        this.disposables = [];
    }
    setupEventListeners(context) {
        const debouncedLogConversation = (0, lodash_1.debounce)(this.logConversation, 500);
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
    logConversation(text) {
        // Log the conversation text
        console.log(`Conversation text: ${text}`);
        const outputChannel = vscode.window.createOutputChannel('Cody Conversation Logger');
        outputChannel.appendLine(`Conversation text: ${text}`);
    }
}
function activate(context) {
    console.log('Cody Conversation Logger: Extension activated');
    const logger = ConversationLogger.getInstance();
    logger.setupEventListeners(context);
}
exports.activate = activate;
function deactivate() {
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
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map