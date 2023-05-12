import * as vscode from "vscode";
import { convertConsumerWidgetCommandName } from "../commands/convert_consumer_widget_command";
import { convertHookConsumerWidgetCommandName } from "../commands/convert_hook_consumer_widget_command";
import { convertHookWidgetCommandName } from "../commands/convert_hook_widget_command";
import { convertStatelessWidgetCommandName } from "../commands/convert_stateless_widget_command";

export class RiverpodCodeActionProvider implements vscode.CodeActionProvider {
  provideCodeActions(
    document: vscode.TextDocument,
    range: vscode.Range | vscode.Selection,
    context: vscode.CodeActionContext,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<(vscode.CodeAction | vscode.Command)[]> {
    const actions: vscode.CodeAction[] = [];

    const documentTextArray = document.getText().split(/\r?\n/g);

    const classDefinitionRegex = new RegExp(/class\s\w+\sextends\s\w+/);
    const consumerWidgetRegex = new RegExp(/class\s\w+\sextends\sConsumerWidget/);
    const hookConsumerWidgetRegex = new RegExp(/class\s\w+\sextends\sHookConsumerWidget/);
    const hookWidgetRegex = new RegExp(/class\s\w+\sextends\sHookWidget/);
    const statelessWidgetRegex = new RegExp(/class\s\w+\sextends\sStatelessWidget/);
    const isSelectedLineClassDefinition = classDefinitionRegex.test(
      documentTextArray[range.start.line]
    );
    const isSelectedLineConsumerWidget = consumerWidgetRegex.test(
      documentTextArray[range.start.line]
    );
    const isSelectedLineHookConsumerWidget = hookConsumerWidgetRegex.test(
      documentTextArray[range.start.line]
    );
    const isSelectedLineHookWidget = hookWidgetRegex.test(
      documentTextArray[range.start.line]
    );
    const isSelectedLineStatelessWidget = statelessWidgetRegex.test(
      documentTextArray[range.start.line]
    );

    if (isSelectedLineClassDefinition && !isSelectedLineConsumerWidget) {
      registerConvertConsumerWidgetCodeAction(document, range, actions);
    }

    if (isSelectedLineClassDefinition && !isSelectedLineHookConsumerWidget) {
      registerConvertHookConsumerWidgetCodeAction(document, range, actions);
    }

    if (isSelectedLineClassDefinition && !isSelectedLineHookWidget) {
      registerConvertHookWidgetCodeAction(document, range, actions);
    }

    if (isSelectedLineClassDefinition && !isSelectedLineStatelessWidget) {
      registerConvertStatelessWidgetCodeAction(document, range, actions);
    }

    return actions;
  }

  resolveCodeAction?(
    codeAction: vscode.CodeAction,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.CodeAction> {
    return codeAction;
  }
}

function registerConvertStatelessWidgetCodeAction(
  document: vscode.TextDocument,
  range: vscode.Range | vscode.Selection,
  actions: vscode.CodeAction[]
) {
  const convertStatelessWidgetCodeAction = new vscode.CodeAction(
    "Convert to StatelessWidget",
    vscode.CodeActionKind.RefactorRewrite
  );

  convertStatelessWidgetCodeAction.command = {
    title: "Convert HookWidget to StatelessWidget",
    command: convertStatelessWidgetCommandName,
    arguments: [document, range],
  };

  actions.push(convertStatelessWidgetCodeAction);
}

function registerConvertHookWidgetCodeAction(
  document: vscode.TextDocument,
  range: vscode.Range | vscode.Selection,
  actions: vscode.CodeAction[]
) {
  const convertHookWidgetCodeAction = new vscode.CodeAction(
    "Convert to HookWidget",
    vscode.CodeActionKind.RefactorRewrite
  );

  convertHookWidgetCodeAction.command = {
    title: "Convert StatelessWidget to HookWidget",
    command: convertHookWidgetCommandName,
    arguments: [document, range],
  };

  actions.push(convertHookWidgetCodeAction);
}

function registerConvertHookConsumerWidgetCodeAction(
  document: vscode.TextDocument,
  range: vscode.Range | vscode.Selection,
  actions: vscode.CodeAction[]
) {
  const convertStatelessWidgetToHookConsumerWidgetCodeAction = new vscode.CodeAction(
    "Convert to HookConsumerWidget",
    vscode.CodeActionKind.RefactorRewrite
  );

  convertStatelessWidgetToHookConsumerWidgetCodeAction.command = {
    title: "Convert StatelessWidget to HookConsumerWidget",
    command: convertHookConsumerWidgetCommandName,
    arguments: [document, range],
  };

  actions.push(convertStatelessWidgetToHookConsumerWidgetCodeAction);
}

function registerConvertConsumerWidgetCodeAction(
  document: vscode.TextDocument,
  range: vscode.Range | vscode.Selection,
  actions: vscode.CodeAction[]
) {
  const convertStatelessWidgetToConsumerWidgetCodeAction = new vscode.CodeAction(
    "Convert to ConsumerWidget",
    vscode.CodeActionKind.RefactorRewrite
  );

  convertStatelessWidgetToConsumerWidgetCodeAction.command = {
    title: "Convert StatelessWidget to ConsumerWidget",
    command: convertConsumerWidgetCommandName,
    arguments: [document, range],
  };

  actions.push(convertStatelessWidgetToConsumerWidgetCodeAction);
}
