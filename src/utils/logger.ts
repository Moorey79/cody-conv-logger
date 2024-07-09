import { window, ExtensionContext } from 'vscode';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class ConversationLogger {
    private static instance: ConversationLogger;

    private constructor() {
        // TODO: Initialize the logger and set up event listeners
    }

    public static getInstance(): ConversationLogger {
        if (!ConversationLogger.instance) {
            ConversationLogger.instance = new ConversationLogger();
        }
        return ConversationLogger.instance;
    }

    public logConversation(conversationText: string): void {
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
