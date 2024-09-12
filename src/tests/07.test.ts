import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import { runCode } from "../utils/run-code";

describe('07', function() {
  const data = getStudentfileInfo();

  const testCases = [
    { value: [1, 2, 3, 4], expected: 7 },
    { value: [5, 4, 3, 2, 1], expected: 9 },
    { value: [1, 2, 3, 3, 2], expected: 6 },
    { value: [4, 4, 4, 2, 1, 3], expected: 8 },
    { value: [0, 2, 0, 9, 8, 2, 8], expected: 17 },
    { value: [10, 2, 1, 5, 6], expected: 16 }, 
    { value: [9, 9, 11, 5, 5, 2], expected: 20 },
    { value: [-10, -20, 5, 1, 0], expected: 6 },
    { value: [100], expected: null },
    { value: [-1, -3, -2, -4], expected: -3 },
    { value: [50, 50, 50, 50], expected: 100 }
  ];

  test('maxSumOfTwo(...)', () => {
    for(let i = 0; i < testCases.length; i++) {
      const code = data.code + '\n\nvar __COURSE_FUNCTION_RETURN_TEST_VAR=maxSumOfTwo(['+testCases[i].value+'])';
      const result = runCode(code, '');
      if(result.error) {
        throw new Error(result.error.short);
      }
      const value = (result.context.__COURSE_FUNCTION_RETURN_TEST_VAR)+'';
      if(value !== testCases[i].expected + '') {
        throw new Error('Misslyckades för: maxSumOfTwo(['+testCases[i].value+'])\nDu returnerade: ' + value + '\nKorrekt är: ' + testCases[i].expected+'');
      } 
    }
  });

});
