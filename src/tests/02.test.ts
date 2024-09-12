import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import { runCode } from "../utils/run-code";

describe('02', function() {
  const data = getStudentfileInfo();

  const testCases = [
    { a: 48, b: 18, expectedGCD: 6 },
    { a: 56, b: 98, expectedGCD: 14 },
    { a: 101, b: 10, expectedGCD: 1 },
    { a: 15, b: 25, expectedGCD: 5 },
    { a: 81, b: 27, expectedGCD: 27 },
    { a: 17, b: 29, expectedGCD: 1 },
    { a: 54, b: 24, expectedGCD: 6 }
  ];

  test('findGCD(...)', () => {
    for(let i = 0; i < testCases.length; i++) {
      const code = data.code + '\n\nvar __COURSE_FUNCTION_RETURN_TEST_VAR=findGCD('+testCases[i].a+', '+testCases[i].b+')';
      const result = runCode(code, '');
      if(result.error) {
        throw new Error(result.error.short);
      }
      const value = (result.context.__COURSE_FUNCTION_RETURN_TEST_VAR)+'';
      if(value !== testCases[i].expectedGCD.toString()) {
        throw new Error('Misslyckades för: findGCD('+testCases[i].a+', '+testCases[i].b+')\nDu returnerade: ' + value + '\nKorrekt är: ' + testCases[i].expectedGCD);
      } 
    }
  });

});
