import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import { runCode } from "../utils/run-code";
import astTraverse, { nodeToIdentifierName } from "./utils/acorn-utils";
import { CallExpression, MemberExpression } from "acorn";

describe('14', function() {
  const data = getStudentfileInfo();

  const testCases = [
    { value: [1,2,3,4], expected: [1,2,3,4] },
    { value: [1,2,[3,4]], expected: [1,2,3,4] },
    { value: [1,2,[3,4],5,6], expected: [1,2,3,4,5,6] },
    { value: [1,[2,3],4,[5,6]], expected: [1,2,3,4,5,6] },
    { value: [1,[2,[3,4,5],6]], expected: [1,2,3,4,5,6] },
    { value: [1,[2,[3,4,5],6,7,[8,9]]], expected: [1,2,3,4,5,6,7,8,9] },
    { value: [1,[2,[3,[4,[5]]],6,7]], expected: [1,2,3,4,5,6,7] },

    { value: [], expected: [] },
  ];

  test('Använd inte vissa inbyggda array funktioner', () => {
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
      if(prop == 'filter')
        throw new Error('Du får inte använda arrayfunktionen filter()')
      if(prop == 'reverse')
        throw new Error('Du får inte använda arrayfunktionen reverse()')
      if(prop == 'split')
        throw new Error('Du får inte använda arrayfunktionen split()')
      if(prop == 'map')
        throw new Error('Du får inte använda arrayfunktionen map()')
      if(prop == 'flat')
        throw new Error('Du får inte använda arrayfunktionen flat()')
      if(prop == 'flatMap')
        throw new Error('Du får inte använda arrayfunktionen flatMap()')
    })
  });

  test('flatten(...)', () => {
    for(let i = 0; i < testCases.length; i++) {
      const code = data.code + '\n\nvar __COURSE_FUNCTION_RETURN_TEST_VAR=flatten('+stringify(testCases[i].value)+')';

      const result = runCode(code, '');
      if(result.error) {
        throw new Error(result.error.short);
      }
      const value = stringify(result.context.__COURSE_FUNCTION_RETURN_TEST_VAR);
      if(value !== stringify(testCases[i].expected)) {
        throw new Error('Misslyckades för: flatten('+stringify(testCases[i].value)+')\nDu returnerade: ' + stringify(value) + '\nKorrekt är: ' + stringify(testCases[i].expected));
      } 
    }
  });

});

function stringify(value: any): string {
  if(Array.isArray(value))
    return '[' + value.map(v => stringify(v)).join(', ') + ']'
  return value;
}
