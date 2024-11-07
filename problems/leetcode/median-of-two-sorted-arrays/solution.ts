function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  const totalLength = nums1.length + nums2.length;
  const isEven = totalLength % 2 === 0;
  const targetIndex = Math.floor(totalLength / 2);

  let p1 = 0,
    p2 = 0;
  let prev = 0,
    curr = 0;

  for (let k = 0; k <= targetIndex; k++) {
    prev = curr;

    if (p1 < nums1.length && (p2 >= nums2.length || nums1[p1] <= nums2[p2])) {
      curr = nums1[p1++];
    } else {
      curr = nums2[p2++];
    }
  }

  return isEven ? (prev + curr) / 2 : curr;
}
