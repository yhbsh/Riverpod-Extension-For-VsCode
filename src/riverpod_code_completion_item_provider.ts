import * as vscode from "vscode";
import { getConsumerWidgetSnippet } from "./snippets/get_consumer_widget_snippet";
import { getHookConsumerWidgetSnippet } from "./snippets/get_hook_consumer_widget_snippet";
import { getHookWidgetSnippet } from "./snippets/get_hook_widget_snippet";

export class RiverpodCodeCompletionItemProvider implements vscode.CompletionItemProvider {
  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext
  ): vscode.ProviderResult<
    vscode.CompletionItem[] | vscode.CompletionList<vscode.CompletionItem>
  > {
    const documentTextArray = document.getText().split(/\r?\n/g);
    const hasImportFlutterRiverpod = documentTextArray.some((line) =>
      line.includes("package:flutter_riverpod/flutter_riverpod.dart")
    );
    const hasImportMaterial = documentTextArray.some((line) =>
      line.includes("package:flutter/material.dart")
    );
    const hasImportHooksRiverpod = documentTextArray.some((line) =>
      line.includes("package:flutter_hooks/flutter_hooks.dart")
    );
    const hasImportFlutterHooks = documentTextArray.some((line) =>
      line.includes("package:flutter_hooks/flutter_hooks.dart")
    );

    const consumerWidgetSnippet = getConsumerWidgetSnippet(
      hasImportFlutterRiverpod,
      hasImportMaterial
    );

    const hookConsumerWidgetSnippet = getHookConsumerWidgetSnippet(
      hasImportHooksRiverpod,
      hasImportMaterial
    );

    const hookWidgetSnippet = getHookWidgetSnippet(
      hasImportFlutterHooks,
      hasImportMaterial
    );

    return [consumerWidgetSnippet, hookConsumerWidgetSnippet, hookWidgetSnippet];
  }
  resolveCompletionItem?(
    item: vscode.CompletionItem,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.CompletionItem> {
    return item;
  }
}
