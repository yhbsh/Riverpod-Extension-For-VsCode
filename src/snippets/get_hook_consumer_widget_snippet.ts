import * as vscode from "vscode";

export function getHookConsumerWidgetSnippet(
  hasImportHooksRiverpod: boolean,
  hasImportMaterial: boolean
) {
  const hookConsumerWidgetSnippet = new vscode.CompletionItem(
    "Riverpod Hook Consumer Widget",
    vscode.CompletionItemKind.Snippet
  );

  hookConsumerWidgetSnippet.insertText = new vscode.SnippetString(
    "class ${1:MyWidget} extends HookConsumerWidget {\n" +
      "\tconst ${1:MyWidget}({super.key});\n" +
      "\n" +
      "\t@override\n" +
      "\tWidget build(BuildContext context, WidgetRef ref) {\n" +
      "\t\treturn ${2:const Placeholder()};\n" +
      "\t}\n" +
      "}"
  );
  hookConsumerWidgetSnippet.documentation = new vscode.MarkdownString(
    "Creates a new HookConsumerWidget.\n\n"
  );
  hookConsumerWidgetSnippet.filterText = "stlessHookConsumerWidget";

  const additionalTextEdits: vscode.TextEdit[] = [];
  if (!hasImportHooksRiverpod) {
    additionalTextEdits.push(
      vscode.TextEdit.insert(
        new vscode.Position(0, 0),
        "import 'package:hooks_riverpod/hooks_riverpod.dart';\n"
      )
    );
  }

  if (!hasImportMaterial) {
    additionalTextEdits.push(
      vscode.TextEdit.insert(
        new vscode.Position(0, 0),
        "import 'package:flutter/material.dart';\n\n"
      )
    );
  }

  hookConsumerWidgetSnippet.additionalTextEdits = additionalTextEdits;
  return hookConsumerWidgetSnippet;
}
