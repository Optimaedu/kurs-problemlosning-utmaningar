import { describe, test } from "mocha";
import { getStudentfileInfo } from "../utils/student-file-info";
import { runCode } from "../utils/run-code";

describe('05', function() {
  const data = getStudentfileInfo();

  const testCases = [
    {value: 'hej på dig', expected: 'hej'},
    {value: 'hur mår du idag', expected: 'idag'},
    {value: 'programmering är roligt', expected: 'programmering'},
    {value: 'nu programmerar vi!', expected: 'programmerar'},
    {value: 'idag har jag spelat spel', expected: 'spelat'}
  ];

  test('findLongestWord(...)', () => {
    for(let i = 0; i < testCases.length; i++) {
      const code = data.code + '\n\nvar __COURSE_FUNCTION_RETURN_TEST_VAR=findLongestWord(\''+testCases[i].value+'\')';
      const result = runCode(code, '');
      if(result.error) {
        throw new Error(result.error.short);
      }
      const value = (result.context.__COURSE_FUNCTION_RETURN_TEST_VAR)+'';
      if(value !== testCases[i].expected.toString()) {
        throw new Error('Misslyckades för: findLongestWord(\''+testCases[i].value+'\')\nDu returnerade: ' + value + '\nKorrekt är: ' + testCases[i].expected);
      } 
    }
  });

});
