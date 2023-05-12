import * as vscode from "vscode";

export function replaceLine(
  edit: vscode.WorkspaceEdit,
  document: vscode.TextDocument,
  range: vscode.Range,
  newLineText: string
) {
  edit.replace(document.uri, range, newLineText);
}
