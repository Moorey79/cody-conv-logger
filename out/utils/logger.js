"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationLogger = void 0;
const vscode = require("vscode");
class ConversationLogger {
    constructor() {
        // TODO: Initialize the logger and set up event listeners
    }
    static getInstance() {
        if (!ConversationLogger.instance) {
            ConversationLogger.instance = new ConversationLogger();
        }
        return ConversationLogger.instance;
    }
    logConversation(conversationText) {
        // Option 1: Write to a file
        const logFilePath = vscode.Uri.joinPath(context.extensionPath, 'conversation_log.txt');
        vscode.workspace.fs.appendFile(logFilePath, `${conversationText}\n`);
        // Option 2: Write to a database (example using a simple JSON file)
        const databasePath = vscode.Uri.joinPath(context.extensionPath, 'conversation_database.json');
        const existingData = JSON.parse(vscode.workspace.fs.readFileSync(databasePath).toString());
        existingData.conversations.push(conversationText);
        vscode.workspace.fs.writeFileSync(databasePath, JSON.stringify(existingData));
    }
}
exports.ConversationLogger = ConversationLogger;
//# sourceMappingURL=logger.js.map