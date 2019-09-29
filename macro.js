// docs: https://github.com/kentcdodds/babel-plugin-macros/blob/HEAD/other/docs/author.md

const { createMacro, MacroError } = require('babel-plugin-macros');
const fs = require('fs');
const pkg = require('./package.json');

const configName = pkg.name;

const pages = {};

// Remove not exist files, etc Rename, Delete
function extractMeta(filePath, meta, config) {
  Object.keys(pages).filter(filePath => {
    try {
      return !fs.existsSync(filePath)
    } catch (e) {
      return true;
    }
  }).forEach(notExistPage => {
    delete pages[notExistPage];
  });

  pages[filePath] = meta;
  config.generator(pages);
}

module.exports = createMacro(webpackCommentImportMacros, { configName });

function webpackCommentImportMacros({ references, state, babel, config }) {

  if (!config) {
    return;
  }
  if (typeof config.generator !== 'function') {
    throw new MacroError(`请指定函数类型，如：
    module.exports = {
        '${configName}': function(){}
    }
        `);
  }
  references.default &&
    references.default.map(referencePath => {
      if (referencePath.parentPath.type === 'CallExpression') {
        requireWebpackCommentImport({ referencePath, state, babel, config });
      } else {
        throw new MacroError(
          `This is not supported: \`${referencePath
            .findParent(babel.types.isExpression)
            .getSource()}\`. Please see the ${configName} documentation`
        );
      }
    });
}

function requireWebpackCommentImport({ referencePath, state, babel, config }) {
  const callExpressionPath = referencePath.parentPath;

  const arguments = callExpressionPath.get('arguments');

  const argumentsValues = arguments.map((argument) => {
    if (!argument) {
      return undefined;
    }
    const code = argument.getSource();
    let value;
    try {
      value = argument.evaluate().value
    } catch (err) {
      // swallow error, print better error below
    }

    if (code && (value === undefined)) {
      throw new MacroError(
        `There was a problem evaluating the value of the argument for the code: ${code}. ` +
        `If the value is dynamic, please make sure that its value is statically deterministic.`
      );
    }
    return value;
  })

  extractMeta(state.file.opts.filename, {
    callee: callExpressionPath.node.callee.name,
    params: argumentsValues
  }, config);
  referencePath.parentPath.parentPath.remove();
}
