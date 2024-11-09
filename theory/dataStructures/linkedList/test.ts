import LinkedList from './index';
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

describe('LinkedList', () => {
  let list: LinkedList<number>;

  beforeEach(() => {
    list = new LinkedList<number>();
  });

  describe('constructor', () => {
    it('should create an empty linked list by default', () => {
      expect(list.length).toBe(0);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
    });

    it('should create a linked list with a head value if provided', () => {
      const listWithHead = new LinkedList(5);
      expect(listWithHead.head).toBe(5);
      expect(listWithHead.tail).toBe(5);
      expect(listWithHead.length).toBe(1);
    });
  });
});
