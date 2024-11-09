import ListNode from './node';

describe('ListNode', () => {
  it('should create a ListNode with a given value and null next by default', () => {
    const node = new ListNode(5);
    expect(node.value).toBe(5);
    expect(node.next).toBeNull();
  });

  it('should allow setting the next node', () => {
    const node1 = new ListNode(5);
    const node2 = new ListNode(10);
    node1.next = node2;
    expect(node1.next).toBe(node2);
  });
});
