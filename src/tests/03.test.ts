import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import { runCode } from "../utils/run-code";

describe('03', function() {
  const data = getStudentfileInfo();

  const testCases = [
    {binary: '0', expected: 0},
    {binary: '1', expected: 1},

    {binary: '00', expected: 0},
    {binary: '01', expected: 1},
    {binary: '10', expected: 2},
    {binary: '11', expected: 3},

    {binary: '000', expected: 0},
    {binary: '001', expected: 1},
    {binary: '010', expected: 2},
    {binary: '011', expected: 3},
    {binary: '100', expected: 4},
    {binary: '101', expected: 5},
    {binary: '110', expected: 6},
    {binary: '111', expected: 7},

    {binary: '0000', expected: 0},
    {binary: '0001', expected: 1},
    {binary: '0010', expected: 2},
    {binary: '0011', expected: 3},
    {binary: '0100', expected: 4},
    {binary: '0101', expected: 5},
    {binary: '0110', expected: 6},
    {binary: '0111', expected: 7},
    {binary: '1000', expected: 8},
    {binary: '1001', expected: 9},
    {binary: '1010', expected: 10},
    {binary: '1011', expected: 11},
    {binary: '1100', expected: 12},
    {binary: '1101', expected: 13},
    {binary: '1110', expected: 14},
    {binary: '1111', expected: 15},
    
    {binary: '1110000', expected: 112},
    {binary: '0110011', expected: 51}
  ];

  test('binaryToDecimal(...)', () => {
    for(let i = 0; i < testCases.length; i++) {
      const code = data.code + '\n\nvar __COURSE_FUNCTION_RETURN_TEST_VAR=binaryToDecimal(\''+testCases[i].binary+'\')';
      const result = runCode(code, '');
      if(result.error) {
        throw new Error(result.error.short);
      }
      const value = (result.context.__COURSE_FUNCTION_RETURN_TEST_VAR)+'';
      if(value !== testCases[i].expected.toString()) {
        throw new Error('Misslyckades för: binaryToDecimal(\''+testCases[i].binary+'\')\nDu returnerade: ' + value + '\nKorrekt är: ' + testCases[i].expected);
      } 
    }
  });

});
