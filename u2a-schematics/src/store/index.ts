import { normalize, strings } from "@angular-devkit/core";
import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  applyTemplates,
  chain,
  mergeWith,
  move,
  url,
} from "@angular-devkit/schematics";
import { StoreSchema } from "./schema";

export function store(options: StoreSchema): Rule {
  return (_tree: Tree, context: SchematicContext) => {
    context.logger.info(`Generating store: ${options.name}`);

    // Where the files will land
    const targetPath = normalize(
      `${options.path}/${strings.dasherize(options.name)}`,
    );
    context.logger.info(`in targetPath: ${targetPath}`);

    const templateSource = apply(url("./files"), [
      applyTemplates({
        // String utility functions available inside templates
        ...strings,
        // Options available inside templates
        name: options.name,
      }),
      move(targetPath),
    ]);

    return chain([
      mergeWith(templateSource),
    ])(_tree, context);
  };
}
