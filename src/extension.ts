import * as vscode from "vscode";

import { RiverpodCodeActionProvider } from "./providers/riverpod_code_action_provider";
import { RiverpodCodeCompletionItemProvider } from "./providers/riverpod_code_completion_item_provider";

import {
  convertConsumerWidgetCommandHandler,
  convertConsumerWidgetCommandName,
} from "./commands/convert_consumer_widget_command";

import {
  convertHookConsumerWidgetCommandHandler,
  convertHookConsumerWidgetCommandName,
} from "./commands/convert_hook_consumer_widget_command";

import {
  convertHookWidgetCommandHandler,
  convertHookWidgetCommandName,
} from "./commands/convert_hook_widget_command";

import {
  convertStatelessWidgetCommandHandler,
  convertStatelessWidgetCommandName,
} from "./commands/convert_stateless_widget_command";

export function activate(context: vscode.ExtensionContext) {
  vscode.languages.registerCodeActionsProvider("dart", new RiverpodCodeActionProvider());

  vscode.languages.registerCompletionItemProvider(
    "dart",
    new RiverpodCodeCompletionItemProvider()
  );

  vscode.commands.registerCommand(
    convertConsumerWidgetCommandName,
    convertConsumerWidgetCommandHandler
  );
  vscode.commands.registerCommand(
    convertHookConsumerWidgetCommandName,
    convertHookConsumerWidgetCommandHandler
  );
  vscode.commands.registerCommand(
    convertHookWidgetCommandName,
    convertHookWidgetCommandHandler
  );

  vscode.commands.registerCommand(
    convertStatelessWidgetCommandName,
    convertStatelessWidgetCommandHandler
  );
}
