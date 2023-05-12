import * as vscode from "vscode";
import { insertImportStatement } from "../functions/insert_import_statement";
import { replaceLine } from "../functions/replace_line";
import { indexFrom } from "../functions/index_from";

export const convertConsumerWidgetCommandName = "extension.convert-consumer-widget";

export function convertConsumerWidgetCommandHandler(
  document: vscode.TextDocument,
  range: vscode.Range
) {
  const documentTextArray = document.getText().split(/\n|\r\n/g);

  // Replace the class definition line with the ConsumerWidget version
  const classDefinitionRegex = new RegExp(/class\s(\w+)\sextends\s(\w+)/);
  const widgetClassDefinitionLineNumber = range.start.line;
  const widgetClassDefinitionLineText =
    documentTextArray[widgetClassDefinitionLineNumber];
  const widgetClassDefinitionLineRange = new vscode.Range(
    new vscode.Position(widgetClassDefinitionLineNumber, 0),
    new vscode.Position(
      widgetClassDefinitionLineNumber,
      widgetClassDefinitionLineText.length
    )
  );

  const widgetClassDefinitionLineMatch = widgetClassDefinitionLineText.match(
    classDefinitionRegex
  ) as RegExpMatchArray;

  const className = widgetClassDefinitionLineMatch[1];

  const consumerWidgetLineText = `class ${className} extends ConsumerWidget {`;

  // Replace the build method with the ConsumerWidget version
  const buildMethodRegex = new RegExp(/Widget\s+build\((.*?)\)/);
  const buildMethodLineNumber = indexFrom(
    documentTextArray,
    buildMethodRegex,
    widgetClassDefinitionLineNumber
  );
  const buildMethodLineText = documentTextArray[buildMethodLineNumber];
  const buildMethodLineRange = new vscode.Range(
    new vscode.Position(buildMethodLineNumber, 0),
    new vscode.Position(buildMethodLineNumber, buildMethodLineText.length)
  );

  const consumerWidgetBuildMethodLineText = buildMethodLineText.replace(
    buildMethodRegex,
    "Widget build(BuildContext context, WidgetRef ref)"
  );

  const edit = new vscode.WorkspaceEdit();

  insertImportStatement(
    edit,
    document,
    documentTextArray,
    "import 'package:flutter_riverpod/flutter_riverpod.dart';"
  );
  replaceLine(edit, document, widgetClassDefinitionLineRange, consumerWidgetLineText);
  replaceLine(edit, document, buildMethodLineRange, consumerWidgetBuildMethodLineText);

  vscode.workspace.applyEdit(edit);
}
