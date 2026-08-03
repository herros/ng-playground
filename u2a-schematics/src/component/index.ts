import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  applyTemplates,
  mergeWith,
  move,
  url,
} from '@angular-devkit/schematics';
import { strings, normalize } from '@angular-devkit/core';
import { ComponentSchema } from './schema';

export function component(options: ComponentSchema): Rule {
  return (_tree: Tree, context: SchematicContext) => {
    context.logger.info(`Generating component: ${options.name}`);

    // Where the files will land
    const targetPath = normalize(
      `${options.path}/${strings.dasherize(options.name)}`
    );

    const templateSource = apply(url('./files'), [
      applyTemplates({
        // String utility functions available inside templates
        ...strings,
        // Options available inside templates
        name:   options.name,
        prefix: options.prefix,
      }),
      move(targetPath),
    ]);

    return mergeWith(templateSource);
  };
}