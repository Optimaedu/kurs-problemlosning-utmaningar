import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import { runCode } from "../utils/run-code";

describe('08', function() {
  const data = getStudentfileInfo();

  const testCases = [
    { value: [-1, -3, 2, -2, 3, 1], expected: 6 },
    { value: [1, 2, -2, 4, -4], expected: 4 },
    { value: [1, 2, 3, -3, -2], expected: 4 },
    { value: [1, 2, 3], expected: 0 },
    { value: [0, 0, 0, 0], expected: 4 },
    { value: [1, -1, 3, 2, -2, -3], expected: 6 },
    { value: [3, -1, -2, 1, 6, -3], expected: 3 },
    { value: [-1, -2, 3, 4, -4], expected: 5 },
    { value: [5, 6, 7, -3, -4, -5, 3], expected: 3 },
    { value: [3, -1, 2, 3, -5, 1, 2], expected: 5 },
    { value: [5,-4, 7, 8], expected: 0 },
    { value: [5], expected: 0 },
    { value: [], expected: 0 },
    { value: [0], expected: 1 },
  ];

  test('sumZero(...)', () => {
    for(let i = 0; i < testCases.length; i++) {
      const code = data.code + '\n\nvar __COURSE_FUNCTION_RETURN_TEST_VAR=sumZero(['+testCases[i].value+'])';
      const result = runCode(code, '');
      if(result.error) {
        throw new Error(result.error.short);
      }
      const value = (result.context.__COURSE_FUNCTION_RETURN_TEST_VAR)+'';
      if(value !== testCases[i].expected + '') {
        throw new Error('Misslyckades för: sumZero(['+testCases[i].value+'])\nDu returnerade: ' + value + '\nKorrekt är: ' + testCases[i].expected+'');
      } 
    }
  });

});
