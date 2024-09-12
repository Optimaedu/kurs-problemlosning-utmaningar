import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import { runCode } from "../utils/run-code";
import astTraverse from "./utils/acorn-utils";

describe('11', function() {
  const data = getStudentfileInfo();

  const testCases = [
    { value: 1, expected: 1 },
    { value: 2, expected: 2 },
    { value: 3, expected: 6 },
    { value: 4, expected: 24 },
    { value: 5, expected: 120 },
    { value: 6, expected: 720 },
    { value: 7, expected: 5040 },
    { value: 11, expected: 1*2*3*4*5*6*7*8*9*10*11 },
    { value: 0, expected: 1 }
  ];
  
  test('Använd inte for-loop', () => {
    astTraverse(data.ast, node => {
      if(node.type == 'ForStatement')
        throw new Error('Du får inte använda en for-loop i denna uppgift.');
    })
  });

  test('Använd inte while-loop', () => {
    astTraverse(data.ast, node => {
      if(node.type == 'WhileStatement')
        throw new Error('Du får inte använda en while-loop i denna uppgift.');
      if(node.type == 'DoWhileStatement')
        throw new Error('Du får inte använda en do-while-loop i denna uppgift.');
    })
  });

  test('factorial(...)', () => {
    for(let i = 0; i < testCases.length; i++) {
      const code = data.code + '\n\nvar __COURSE_FUNCTION_RETURN_TEST_VAR=factorial('+testCases[i].value+')';
      const result = runCode(code, '');
      if(result.error) {
        throw new Error(result.error.short);
      }
      const value = (result.context.__COURSE_FUNCTION_RETURN_TEST_VAR)+'';
      if(value !== testCases[i].expected + '') {
        throw new Error('Misslyckades för: factorial('+testCases[i].value+')\nDu returnerade: ' + value + '\nKorrekt är: ' + testCases[i].expected);
      } 
    }
  });

});
