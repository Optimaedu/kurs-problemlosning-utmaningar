import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import { runCode } from "../utils/run-code";
import astTraverse, { nodeToIdentifierName } from "./utils/acorn-utils";
import { CallExpression, MemberExpression } from "acorn";

const sort = (v: number[]) => v.sort((a,b) => a-b);

describe('01', function() {
  const data = getStudentfileInfo();

  const testCases = [
    {value: [1,2,3,4], expected: [1,2,3,4]},
    {value: [9,8,7,6,5], expected: [5,6,7,8,9]},
    {value: [4,6,5,2,9], expected: [2,4,5,6,9]},
    {value: [5,9,10,2,4,11], expected: [2,4,5,9,10,11]},
    {value: [13,8,23,11,99,10], expected: sort([13,8,23,11,99,10])},
    {value: [32,4,2,0,10], expected: sort([32,4,2,0,10])},
    {value: [-2,6,2,-99,12], expected: sort([-2,6,2,-99,12])}
  ];

  test('sortNumbers(...)', () => {
    for(let i = 0; i < testCases.length; i++) {
      const code = data.code + `\n\n
      var __COURSE_TEPM_VAR=[${[...testCases[i].value].join(',')}]
      var __COURSE_FUNCTION_RETURN_TEST_VAR=sortNumbers(__COURSE_TEPM_VAR)`;
      const result = runCode(code, '');
      if(result.error) {
        throw new Error(result.error.short);
      }
      const value = (result.context.__COURSE_FUNCTION_RETURN_TEST_VAR)+'';
      if(value !== testCases[i].expected.toString()) {
        throw new Error('Misslyckades för: sortNumbers(['+testCases[i].value.join(',')+'])\nDu returnerade: ' + value + '\nKorrekt är: ' + testCases[i].expected);
      }
      if(result.context.__COURSE_TEPM_VAR.join() !== testCases[i].value.join()) {
        throw new Error('Du modifierade arrayn som gavs som argument.\nDu måste returnera en ny array som är sorterad.');
      }
    }
  });

});
