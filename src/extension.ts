import * as vscode from "vscode";

import { RiverpodCodeActionProvider } from "./riverpod_code_action_provider";
import {
  convertConsumerWidgetCommandHandler,
  convertConsumerWidgetCommandName,
} from "./convert_consumer_widget_command";

import {
  convertHookConsumerWidgetCommandHandler,
  convertHookConsumerWidgetCommandName,
} from "./convert_hook_consumer_widget_command";

import { convertHookWidgetCommandHandler, convertHookWidgetCommandName } from "./convert_hook_widget_command";

export function activate(context: vscode.ExtensionContext) {
  vscode.languages.registerCodeActionsProvider("dart", new RiverpodCodeActionProvider());

  vscode.commands.registerCommand(convertConsumerWidgetCommandName, convertConsumerWidgetCommandHandler);
  vscode.commands.registerCommand(convertHookConsumerWidgetCommandName, convertHookConsumerWidgetCommandHandler);
  vscode.commands.registerCommand(convertHookWidgetCommandName, convertHookWidgetCommandHandler);
}
