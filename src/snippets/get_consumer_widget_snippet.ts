import * as vscode from "vscode";

export function getConsumerWidgetSnippet(
  hasImportFlutterRiverpod: boolean,
  hasImportMaterial: boolean
) {
  const consumerWidgetSnippet = new vscode.CompletionItem(
    "Riverpod Consumer Widget",
    vscode.CompletionItemKind.Snippet
  );

  consumerWidgetSnippet.insertText = new vscode.SnippetString(
    "class ${1:MyWidget} extends ConsumerWidget {\n" +
      "\tconst ${1:MyWidget}({super.key});\n" +
      "\n" +
      "\t@override\n" +
      "\tWidget build(BuildContext context, WidgetRef ref) {\n" +
      "\t\treturn ${2:const Placeholder()};\n" +
      "\t}\n" +
      "}"
  );
  consumerWidgetSnippet.documentation = new vscode.MarkdownString(
    "Creates a new ConsumerWidget.\n\n"
  );
  consumerWidgetSnippet.filterText = "stlessConsumerWidget";

  const additionalTextEdits: vscode.TextEdit[] = [];
  if (!hasImportFlutterRiverpod) {
    additionalTextEdits.push(
      vscode.TextEdit.insert(
        new vscode.Position(0, 0),
        "import 'package:flutter_riverpod/flutter_riverpod.dart';\n"
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

  consumerWidgetSnippet.additionalTextEdits = additionalTextEdits;
  return consumerWidgetSnippet;
}
