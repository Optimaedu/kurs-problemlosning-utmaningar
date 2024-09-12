import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import { runCode } from "../utils/run-code";

describe('04', function() {
  const data = getStudentfileInfo();

  const testCases = [
    {value: [1,2,3,4,5], expected: 3},
    {value: [2,4,6], expected: 4},
    {value: [7,9,5,8,6], expected: 7},
    {value: [10,9,8,12,11], expected: 10},
    {value: [1,2,3,4,5,6], expected: 3.5},
    {value: [100,50,76,90], expected: 83},
    {value: [7,0,2,3,8,4,7,2,10,11], expected: 5.5},
    {value: [2,4], expected: 3},
    {value: [5], expected: 5}
  ];

  test('median(...)', () => {
    for(let i = 0; i < testCases.length; i++) {
      const code = data.code + '\n\nvar __COURSE_FUNCTION_RETURN_TEST_VAR=median(['+testCases[i].value.join(',')+'])';
      const result = runCode(code, '');
      if(result.error) {
        throw new Error(result.error.short);
      }
      const value = (result.context.__COURSE_FUNCTION_RETURN_TEST_VAR)+'';
      if(value !== testCases[i].expected.toString()) {
        throw new Error('Misslyckades för: median(['+testCases[i].value.join(',')+'])\nDu returnerade: ' + value + '\nKorrekt är: ' + testCases[i].expected);
      } 
    }
  });

});
