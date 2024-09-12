import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import { runCode } from "../utils/run-code";
import astTraverse from "./utils/acorn-utils";

describe('13', function() {
  const data = getStudentfileInfo();

  const testCases = [
    { value: '()', expected: true },
    { value: '[]', expected: true },
    { value: '{}', expected: true },
    { value: '([])', expected: true },
    { value: '({})', expected: true },
    { value: '[()]', expected: true },
    { value: '[{}]', expected: true },
    { value: '[{()}]', expected: true },
    { value: '([{}])', expected: true },
    { value: '({[]})', expected: true },
    { value: '()()', expected: true },
    { value: '()[]', expected: true },
    { value: '()[]{}', expected: true },
    { value: '(())', expected: true },
    { value: '(()())', expected: true },
    { value: '(()[])', expected: true },
    { value: '(()[]{})', expected: true },
    { value: '([()])', expected: true },
    { value: '([({})])', expected: true },
    { value: '([({})][])', expected: true },
    { value: '([({})][{}])', expected: true },
    { value: '([({})][{()}])', expected: true },

    { value: '(', expected: false },
    { value: ')', expected: false },
    { value: '[', expected: false },
    { value: ']', expected: false },
    { value: '{', expected: false },
    { value: '}', expected: false },
    { value: '()(', expected: false },
    { value: '())', expected: false },
    { value: '()[', expected: false },
    { value: '([)]', expected: false },
    { value: '({[}])', expected: false },
    { value: '()[]{([)]}', expected: false },
    { value: '([({})[{]()}])', expected: false },
    { value: '([({})][])(', expected: false },
  ];

  test('isBalanced(...)', () => {
    for(let i = 0; i < testCases.length; i++) {
      const code = data.code + '\n\nvar __COURSE_FUNCTION_RETURN_TEST_VAR=isBalanced(\''+testCases[i].value+'\')';
      const result = runCode(code, '');
      if(result.error) {
        throw new Error(result.error.short);
      }
      const value = (result.context.__COURSE_FUNCTION_RETURN_TEST_VAR)+'';
      if(value !== testCases[i].expected + '') {
        throw new Error('Misslyckades för: isBalanced(\''+testCases[i].value+'\')\nDu returnerade: ' + value + '\nKorrekt är: ' + testCases[i].expected);
      } 
    }
  });

});
