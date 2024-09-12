import chalk from "chalk";
import { diffChars } from "diff";
import { runCode } from "../../utils/run-code";
import { test } from "mocha";

export default function testFunctionResult(code: string, call: string, expected: string|number|any) {
  test(call, () => {
    code += '\n\nvar __COURSE_FUNCTION_RETURN_TEST_VAR=' + call;
    const result = runCode(code, '');
    if(result.error) {
      throw new Error(result.error.short);
    }

    const value = (result.context.__COURSE_FUNCTION_RETURN_TEST_VAR)+'';
    const expectedStr = expected+'';

    if(value !== expectedStr) {
      const diff = diffChars(value, expectedStr);
      
      let stylizedExpected = '';
      let stylizedOutput = '';
      
      for(let i = 0; i < diff.length; i++) {
        if(!diff[i].added && !diff[i].removed) {
          stylizedExpected += chalk.white(diff[i].value);
          stylizedOutput += chalk.white(diff[i].value);
        }
        else if(diff[i].added && diff[i].value === '\n')
          stylizedExpected += ' ' + chalk.yellow('↲\n');
        else if(diff[i].added)
          stylizedExpected += chalk.bold.bgYellow.black(diff[i].value);
        else if(diff[i].removed && diff[i].value === '\n')
          stylizedOutput += chalk.red('\n\x1b[2D↱') + ' ';
        else if(diff[i].removed)
          stylizedOutput += chalk.bold.bgRed.white(diff[i].value);
      }
      
      throw new Error(
        chalk.bold(`Förväntad output:\n`) + 
        chalk.white(indent(stylizedExpected)) +
        chalk.bold(`\nDin output:\n`) + 
        chalk.white(indent(stylizedOutput))
      );
    }
  });
}

function indent(output: string) {
  if(!output)
    return '  ' + output;
  return '  ' + output.split(/\n/g).join('\n  ');
}
