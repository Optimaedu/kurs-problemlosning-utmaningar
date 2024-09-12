import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import { runCode } from "../utils/run-code";

describe('09', function() {
  const data = getStudentfileInfo();

  const testCases = [
    { value: [3, 1, 4, 2, 5], expected: [5, 3, 1, 2, 4] },
    { value: [7, 5, 9, 6, 4], expected: [9,7,5,4,6] }, 
    { value: [1, 2, 3, 4, 5, 6, 7, 8, 9], expected: [9,7,5,3,1,2,4,6,8] },
    { value: [8, 6, 3, 4, 1], expected: [3, 1, 4, 6, 8] },
    { value: [1, 3, 5], expected: [5, 3, 1] },
    { value: [5, 3, 1], expected: [5, 3, 1] },
    { value: [3, 5, 1], expected: [5, 3, 1] },
    { value: [3, 1, 5], expected: [5, 3, 1] },
    { value: [2, 4, 6], expected: [2, 4, 6] },
    { value: [4, 2, 6], expected: [2, 4, 6] },
    { value: [6, 4, 2], expected: [2, 4, 6] },
    { value: [2, 6, 4], expected: [2, 4, 6] },
    { value: [6, 0, 4, 2], expected: [0, 2, 4, 6] },
    { value: [5, 7, 10, 9, 11], expected: [11, 9, 7, 5, 10] },
    { value: [3,3,3,3], expected: [3,3,3,3] },
    { value: [4, 4, 4, 4, 4], expected: [4, 4, 4, 4, 4] },
    { value: [-1,4,7,0,-2,2,3,-3], expected: [7,3,-1,-3,-2,0,2,4] },
    { value: [], expected: [] },
  ];

  test('arrange(...)', () => {
    for(let i = 0; i < testCases.length; i++) {
      const code = data.code + '\n\nvar __COURSE_FUNCTION_RETURN_TEST_VAR=arrange(['+testCases[i].value+'])';
      const result = runCode(code, '');
      if(result.error) {
        throw new Error(result.error.short);
      }
      const value = (result.context.__COURSE_FUNCTION_RETURN_TEST_VAR)+'';
      if(value !== testCases[i].expected.toString()) {
        throw new Error('Misslyckades för: arrange(['+testCases[i].value+'])\nDu returnerade: ' + (Array.isArray(value) ? '['+value+']' : value) + '\nKorrekt är: [' + testCases[i].expected+']');
      } 
    }
  });

});
