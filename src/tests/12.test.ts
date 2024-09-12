import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import { runCode } from "../utils/run-code";
import astTraverse, { nodeToIdentifierName } from "./utils/acorn-utils";
import { CallExpression, MemberExpression } from "acorn";

describe('12', function() {
  const data = getStudentfileInfo();

  const testCases = [
    { value: 'Hello', expected: 'olleH' },
    { value: 'world', expected: 'dlrow' },
    { value: 'Programmering', expected: 'gniremmargorP' },
    { value: 'JavaScript', expected: 'tpircSavaJ' },
    { value: 'radar', expected: 'radar' },
    { value: '', expected: '' },
  ]

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

  test('Använd inte inbyggda array funktioner', () => {
    astTraverse(data.ast, node => {
      if(node.type !== 'CallExpression')
        return

      const call = node as CallExpression
      if(!call.callee)
        return;
      const callee = call.callee as MemberExpression
      if(!callee.property)
        return;
      const prop = nodeToIdentifierName(callee.property);
      if(prop == 'join')
        throw new Error('Du får inte använda arrayfunktionen join()')
      if(prop == 'reverse')
        throw new Error('Du får inte använda arrayfunktionen reverse()')
      if(prop == 'split')
        throw new Error('Du får inte använda arrayfunktionen split()')
    })
  });


  test('reverseString(...)', () => {
    for(let i = 0; i < testCases.length; i++) {
      const code = data.code + '\n\nvar __COURSE_FUNCTION_RETURN_TEST_VAR=reverseString(\''+testCases[i].value+'\')';
      const result = runCode(code, '');
      if(result.error) {
        throw new Error(result.error.short);
      }
      const value = (result.context.__COURSE_FUNCTION_RETURN_TEST_VAR)+'';
      if(value !== testCases[i].expected + '') {
        throw new Error('Misslyckades för: reverseString(\''+testCases[i].value+'\')\nDu returnerade: ' + value + '\nKorrekt är: ' + testCases[i].expected);
      } 
    }
  });

});
