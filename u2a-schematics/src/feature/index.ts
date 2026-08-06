import { normalize, strings } from '@angular-devkit/core';
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
import { FeatureSchema } from './schema';

export function feature(options: FeatureSchema): Rule {
  return (_tree: Tree, context: SchematicContext) => {
    context.logger.info(`Generating feature: ${options.name}`);

    // Where the files will land
    const targetPath = normalize(
      `${options.path}/${strings.dasherize(options.name)}`,
    );

    const templateSource = apply(url('./files'), [
      applyTemplates({
        // String utility functions available inside templates
        ...strings,
        // Options available inside templates
        name: options.name,
      }),
      move(targetPath),
    ]);

    return mergeWith(templateSource);
  };
}
