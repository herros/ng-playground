# First U2A Schematics library

This repository is a U2A Schematic implementation that serves as a starting point to create and publish Schematics to NPM.

### Testing

To test locally, install `@angular-devkit/schematics-cli` globally and use the `schematics` command line tool. That tool acts the same as the `generate` command of the Angular CLI, but also has a debug mode.

Check the documentation with

```bash
schematics --help
```

### Unit Testing

`npm run test` will run the unit tests, using Jasmine as a runner and test framework.
TODO convert to vitest


### Publishing (work in progress)

To publish, simply do:

```bash
npm run build
npm publish
```

That's it!

### for now 

npm run build
npm link

### in receiving work space

npm link u2a-schematics
ng g u2a-schematics:component <<component name>> (and, values are the defaults, --prefix u2a --path src/app)

