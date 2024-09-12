import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import { runCode } from "../utils/run-code";

describe('10', function() {
  const data = getStudentfileInfo();

  const testCases = [
    { value: '()', expected: true },
    { value: '(', expected: false },
    { value: ')', expected: false },
    { value: '(())', expected: true },
    { value: '(()', expected: false },
    { value: '())', expected: false },
    { value: '))', expected: false },
    { value: '((', expected: false },
    { value: '((()))', expected: true },
    { value: '((())', expected: false },
    { value: '(()))', expected: false },
    { value: '(a+b-(c+d))', expected: true },
    { value: '(a+b-c+d))', expected: false },
    { value: '(a+b-(c+d)', expected: false },
    { value: '(a+b-(c+d', expected: false },
    { value: 'a+b-(c+d))', expected: false },
    { value: '((2+3)*(3-(4)))', expected: true },
    { value: '(2+3)*(3-(4)))', expected: false },
    { value: '((2+3*(3-(4)))', expected: false },
    { value: '((2+3)*3-(4)))', expected: false },
    { value: '((2+3)*(3-4)))', expected: false },
    { value: '((2+3)*(3-(4))', expected: false },
    { value: '((2+3)*(3-(4)', expected: false },
    { value: '((2+3)*(3-(4', expected: false },
    { value: '2+3)*(3-(4))', expected: false }
  ];

  test('isValidParentheses(...)', () => {
    for(let i = 0; i < testCases.length; i++) {
      const code = data.code + '\n\nvar __COURSE_FUNCTION_RETURN_TEST_VAR=isValidParentheses(\''+testCases[i].value+'\')';
      const result = runCode(code, '');
      if(result.error) {
        throw new Error(result.error.short);
      }
      const value = (result.context.__COURSE_FUNCTION_RETURN_TEST_VAR)+'';
      if(value !== testCases[i].expected + '') {
        throw new Error('Misslyckades för: isValidParentheses(\''+testCases[i].value+'\')\nDu returnerade: ' + value + '\nKorrekt är: ' + testCases[i].expected+'');
      } 
    }
  });

});
