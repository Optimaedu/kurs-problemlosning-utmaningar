import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import { runCode } from "../utils/run-code";

describe('06', function() {
  const data = getStudentfileInfo();

  const testCases = [
    {value: [1,1,2,3], expected: [1]},
    {value: [4,5,6,5,-5], expected: [5]},
    {value: [2,1,2,1,9,0], expected: [1,2]},
    {value: [5,4,3,-6,-7,-6,3], expected: [-6,3]},
    {value: [1,2,3,1,2,1,3,2], expected: [1,2]},
    {value: [7,8,7,9,10,10], expected: [7,10]},
    {value: [1,1,2,2,3,3,3], expected: [3]},
  ];

  test('findMode(...)', () => {
    for(let i = 0; i < testCases.length; i++) {
      const code = data.code + '\n\nvar __COURSE_FUNCTION_RETURN_TEST_VAR=findMode(['+testCases[i].value+'])';
      const result = runCode(code, '');
      if(result.error) {
        throw new Error(result.error.short);
      }
      const value = (result.context.__COURSE_FUNCTION_RETURN_TEST_VAR)+'';
      if(value !== testCases[i].expected.toString()) {
        throw new Error('Misslyckades för: findMode(['+testCases[i].value+'])\nDu returnerade: '+(Array.isArray(value) ? '['+value+']' : value)+'\nKorrekt är: [' + testCases[i].expected+']');
      } 
    }
  });

});
