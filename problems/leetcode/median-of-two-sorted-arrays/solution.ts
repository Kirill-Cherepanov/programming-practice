function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  const isEven = !((nums1.length + nums2.length) % 2);
  const targetIndex =
    Math.ceil((nums1.length + nums2.length) / 2) + Number(isEven);
  let pointer1 = nums1.shift();
  let pointer2 = nums2.shift();
  let result = [];

  while (result.length < targetIndex) {
    if (pointer2 == null || pointer1! < pointer2) {
      result.push(pointer1!);
      pointer1 = nums1.shift();
      continue;
    }
    result.push(pointer2!);
    pointer2 = nums2.shift();
  }

  return isEven ? (result.pop()! + result.pop()!) / 2 : result.pop()!;
}
