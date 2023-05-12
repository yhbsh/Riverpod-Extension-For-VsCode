import * as vscode from "vscode";

export function getHookWidgetSnippet(
  hasImportFlutterHooks: boolean,
  hasImportMaterial: boolean
) {
  const hookWidgetSnippet = new vscode.CompletionItem(
    "Flutter Hook Widget",
    vscode.CompletionItemKind.Snippet
  );

  hookWidgetSnippet.insertText = new vscode.SnippetString(
    "class ${1:MyWidget} extends HookWidget {\n" +
      "\tconst ${1:MyWidget}({super.key});\n" +
      "\n" +
      "\t@override\n" +
      "\tWidget build(BuildContext context) {\n" +
      "\t\treturn ${2:const Placeholder()};\n" +
      "\t}\n" +
      "}"
  );
  hookWidgetSnippet.documentation = new vscode.MarkdownString(
    "Creates a new HookWidget.\n\n"
  );
  hookWidgetSnippet.filterText = "stlessHookWidget";

  const additionalTextEdits: vscode.TextEdit[] = [];
  if (!hasImportFlutterHooks) {
    additionalTextEdits.push(
      vscode.TextEdit.insert(
        new vscode.Position(0, 0),
        "import 'package:flutter_hooks/flutter_hooks.dart';\n"
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

  hookWidgetSnippet.additionalTextEdits = additionalTextEdits;
  return hookWidgetSnippet;
}
