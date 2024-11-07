import binarySearchIterative from './algorithmIterative';
import binarySearchRecursive from './algorithmRecursive';

type TSearch = typeof binarySearchIterative | typeof binarySearchRecursive;

describe('binarySearch', () => {
  const lengths = [80, 100, 1000, 5, 4214, 1];
  const maxNumber = 100;

  const test = (search: TSearch) => (length: number) => {
    const nums = [
      ...new Set(
        Array(length)
          .fill(null)
          .map(() => Math.floor(Math.random() * maxNumber))
          .toSorted((a, b) => a - b)
      ),
    ];

    const index = Math.floor(Math.random() * nums.length);
    const result = search(nums, nums[index]);

    if (result !== index) {
      throw Error(`It doesn't work: ${result} !== ${index}`);
    }
  };

  it.each(lengths)(
    'iterative should work for length %s',
    test(binarySearchIterative)
  );
  it.each(lengths)(
    'recursive should work for length %s',
    test(binarySearchRecursive)
  );
});
