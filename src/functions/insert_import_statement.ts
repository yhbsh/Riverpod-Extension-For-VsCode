import * as vscode from "vscode";

export function insertImportStatement(
  edit: vscode.WorkspaceEdit,
  document: vscode.TextDocument,
  documentTextArray: string[],
  importStatement: string
) {
  // only insert the import statement if it doesn't already exist
  const importStatementRegex = new RegExp(importStatement);
  const importStatementExists = documentTextArray.some((line) => line.match(importStatementRegex));
  if (importStatementExists) {
    return;
  }

  // insert at the top of the file
  const position = new vscode.Position(0, 0);
  edit.insert(document.uri, position, `${importStatement}\n`);
}
