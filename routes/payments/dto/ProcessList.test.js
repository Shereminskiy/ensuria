// import { describe, expect, it } from '@jest/globals';
//
// describe('example test suite', () => {
//   it('should pass this test', () => {
//     expect(true).toBe(true);
//   });
// });
//
// // describe('ProcessListDTO', () => {
// //   it('Expect population dto', () => {
// //     const dto = ProcessListDto.populate([{ id: 1, name: 'test' }]);
// //     console.log(dto);
// //     expect(dto).toEqual([{ id: 1 }]);
// //   });
// // });

import { describe, expect, test } from '@jest/globals';

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
  });
});
