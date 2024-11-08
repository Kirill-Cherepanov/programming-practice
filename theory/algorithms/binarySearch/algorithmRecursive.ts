const binarySearchRecursive = (
  nums: number[],
  target: number,
  start: number = 0,
  end: number = nums.length
): number => {
  const mid = Math.floor((start + end) / 2);

  if (nums[mid] === target) return mid;
  if (start >= end) throw new Error('Incorrect input');
  if (nums[mid] < target)
    return binarySearchRecursive(nums, target, mid + 1, end);
  return binarySearchRecursive(nums, target, start, mid - 1);
};

export default binarySearchRecursive;
