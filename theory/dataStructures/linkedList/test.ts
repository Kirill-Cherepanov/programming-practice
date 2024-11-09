import LinkedList from './index';
import ListNode from './node';

describe('ListNode', () => {
  it('should create a ListNode with a given value and null next by default', () => {
    const node = new ListNode(1);
    expect(node.value).toBe(1);
    expect(node.next).toBeNull();
  });

  it('should allow setting the next node', () => {
    const node1 = new ListNode(1);
    const node2 = new ListNode(2);
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
      const listWithHead = new LinkedList(1);
      expect(listWithHead.head).toBe(1);
      expect(listWithHead.tail).toBe(1);
      expect(listWithHead.length).toBe(1);
    });
  });

  describe('get, getFromEnd, and at', () => {
    beforeEach(() => {
      list = LinkedList.fromArray([1, 2, 3, 4]);
    });

    it('should get the value at a specified position', () => {
      expect(list.get(2)).toBe(3);
    });

    it('should get the value from the end at a specified position', () => {
      expect(list.getFromEnd(1)).toBe(3);
    });

    it('should get the values at any position', () => {
      expect(list.at(-1)).toBe(4);
      expect(list.at(-4)).toBe(1);
      expect(list.at(0)).toBe(1);
      expect(list.at(2)).toBe(3);
    });

    it('should throw an error if the position is out of bounds', () => {
      expect(() => list.get(4)).toThrow(
        LinkedList['errors'].getOutOfBounds(4, 4)
      );
    });
  });
});
