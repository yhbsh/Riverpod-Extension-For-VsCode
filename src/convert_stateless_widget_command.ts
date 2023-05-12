import * as vscode from "vscode";
import { replaceLine } from "./functions/replace_line";
import { indexFrom } from "./functions/index_starting_from";

export const convertStatelessWidgetCommandName = "extension.convert-stateless-widget";

export function convertStatelessWidgetCommandHandler(
  document: vscode.TextDocument,
  range: vscode.Range
) {
  const documentTextArray = document.getText().split(/\n|\r\n/g);

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
  const statelessWidgetLineText = `class ${className} extends StatelessWidget {`;

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

  const refBuildMethodLineText = buildMethodLineText.replace(
    buildMethodRegex,
    "Widget build(BuildContext context)"
  );

  const edit = new vscode.WorkspaceEdit();

  replaceLine(edit, document, widgetClassDefinitionLineRange, statelessWidgetLineText);
  replaceLine(edit, document, buildMethodLineRange, refBuildMethodLineText);

  vscode.workspace.applyEdit(edit);
}
