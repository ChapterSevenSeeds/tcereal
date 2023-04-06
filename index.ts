import fs from "fs/promises";
import ts, { factory, isClassDeclaration } from "typescript";
import { isPropertyDeclaration } from "typescript";
import { isTypeElement } from "typescript";

(async () => {
    const source = await fs.readFile("./tests/BasicClass.ts", "utf8");
    const node = ts.createSourceFile("name.ts", source, ts.ScriptTarget.Latest);

   /*  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

    const result = printer.printNode(ts.EmitHint.Unspecified, deserializerFunction, undefined);
    console.log(result); // function foo() { } */

    const block: ts.Statement[] = [];

    node.forEachChild(child => {
        if (isClassDeclaration(child)) {
            for (const member of child.members) {
                if (isPropertyDeclaration(member)) {
                    console.log(ts.SyntaxKind[member.type.kind]);
                }
            }
        }
    });

    const deserializerFunction = factory.createFunctionDeclaration(
        [factory.createModifier(ts.SyntaxKind.PublicKeyword)],
        undefined, "deserialize",
        [],
        [factory.createParameterDeclaration([], undefined, "obj", undefined, factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword))],
        undefined,
        undefined
    );
})();