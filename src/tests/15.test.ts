import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import { runCode } from "../utils/run-code";

describe('15', function() {
  const data = getStudentfileInfo();

  const testCases = [
    { value: [1,2,3,4], target: 3, expected: [[3], [1,2]] },
    { value: [1,2,3,4], target: 4, expected: [[4], [1,3]] },
    { value: [1,2,3,4,5,6,7,8,9], target: 1, expected: [[1]] },
    { value: [1,2,3,4,5,6,7,8,9], target: 2, expected: [[2]] },
    { value: [1,2,3,4,5,6,7,8,9], target: 3, expected: [[3], [1,2]] },
    { value: [1,2,3,4,5,6,7,8,9], target: 4, expected: [[4], [1,3]] },
    { value: [1,2,3,4,5,6,7,8,9], target: 5, expected: [[5],[2,3],[1,4]] },
    { value: [1,2,3,4,5,6,7,8,9], target: 6, expected: [[6],[2,4],[1,5],[1,2,3]] },
    { value: [1,2,3,4,5,6,7,8,9], target: 7, expected: [[7], [3,4],[2,5],[1,6],[1,2,4]] },
    { value: [], target: 0, expected: [] },
  ];

  test('subsetWithSum(...)', () => {
    for(let i = 0; i < testCases.length; i++) {
      const code = data.code + '\n\nvar __COURSE_FUNCTION_RETURN_TEST_VAR=subsetWithSum(['+testCases[i].value+'], '+testCases[i].target+')';
      const result = runCode(code, '');
      if(result.error) {
        throw new Error(result.error.short);
      }
      const value = result.context.__COURSE_FUNCTION_RETURN_TEST_VAR;
      
      if(!check(value, testCases[i].target)) {
        throw new Error('Misslyckades för: subsetWithSum('+stringify(testCases[i].value)+', '+testCases[i].target+')\nDu returnerade: ' + stringify(value) + '\nKorrekt är: ' + stringify(testCases[i].expected));
      } 
    }
  });

});

function stringify(value: any): string {
  if(Array.isArray(value))
    return '[' + value.map(v => stringify(v)).join(', ') + ']'
  return value;
}

function check(arr: any, target: number) {
  if(!Array.isArray(arr))
    return false;
  for(let i = 0; i < arr.length; i++) {
    if(!Array.isArray(arr[i]))
      return false;
    let sum = arr[i].length < 1 ? 0 : arr[i].reduce((a: number,b:number) => a+b);
    if(sum != target)
      return false
  }
  return true;
}