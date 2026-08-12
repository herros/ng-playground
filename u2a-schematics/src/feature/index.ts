import { normalize, strings } from "@angular-devkit/core";
import {
  MergeStrategy,
  Rule,
  SchematicContext,
  Tree,
  apply,
  applyTemplates,
  chain,
  externalSchematic,
  mergeWith,
  move,
  schematic,
  url,
} from "@angular-devkit/schematics";
import { FeatureSchema } from "./schema";

export function feature(options: FeatureSchema): Rule {
  return (_tree: Tree, context: SchematicContext) => {
    context.logger.info(`Generating feature: ${options.name}`);

    // Where the files will land
    const targetPath = normalize(
      `${options.path}/${strings.dasherize(options.name)}`,
    );
    context.logger.info(`in targetPath: ${targetPath}`);
    context.logger.info(`in targetPath: ${targetPath}`);

    const templateSource = apply(url("./files"), [
      applyTemplates({
        // String utility functions available inside templates
        ...strings,
        // Options available inside templates
        name: options.name,
        nameEP: `${options.name}Entrypoint`,
        nameCN: `${options.name}Container`,
        prefix: options.prefix,
      }),
      move(targetPath),
    ]);

    return chain([
      externalSchematic("@schematics/angular", "component", {
        name: `${options.name}Entrypoint`,
        path: targetPath,
        flat: true,
        inlineStyle: true,
        inlineTemplate: true,
        skipTests: true,
      }),
      externalSchematic("@schematics/angular", "component", {
        name: `./components/${options.name}`,
        path: targetPath,
        flat: true,
        inlineStyle: false,
        inlineTemplate: false,
        skipTests: true,
      }),
      externalSchematic("@schematics/angular", "component", {
        name: `./components/${options.name}Container`,
        path: targetPath,
        flat: true,
        inlineStyle: false,
        inlineTemplate: false,
        skipTests: true,
      }),
      schematic("store", {
        name: `${options.name}`,
      }),
      mergeWith(templateSource, MergeStrategy.Overwrite),
    ])(_tree, context);
  };
}
