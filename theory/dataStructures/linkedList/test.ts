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

  describe('insert', () => {
    it('should insert a node at a specified position', () => {
      list.insert(0, 1);
      list.insert(0, 2);
      list.insert(2, 3);
      list.insert(1, 4);
      expect(list.toArray()).toEqual([2, 4, 1, 3]);
    });

    it('should insert a node at a negative position', () => {
      list.insert(-1, 1);
      list.insert(-2, 2);
      list.insert(-1, 3);
      expect(list.toArray()).toEqual([2, 1, 3]);
    });

    it('should throw an error if the position is out of bounds', () => {
      list.insert(0, 1);
      expect(() => list.insert(4, 2)).toThrow(
        LinkedList['errors'].getOutOfBounds(1, 3)
      );
      expect(() => list.insert(-3, 3)).toThrow(
        LinkedList['errors'].getOutOfBounds(1, -3)
      );
    });
  });

  describe('append', () => {
    it('should append nodes to the end of the list', () => {
      list.append(1);
      list.append(2);
      list.append(3);
      expect(list.toArray()).toEqual([1, 2, 3]);
    });
  });

  describe('prepend', () => {
    it('should prepend nodes to the start of the list', () => {
      list.prepend(1);
      list.prepend(2);
      expect(list.toArray()).toEqual([2, 1]);
    });
  });

  describe('remove', () => {
    it('should remove a node at a specified position', () => {
      list.append(1);
      list.append(2);
      list.append(3);
      list.remove(2);
      list.remove(0);
      expect(list.toArray()).toEqual([2]);
    });

    it('should remove a node at a negative position', () => {
      list.append(1);
      list.append(2);
      list.append(3);
      list.remove(-3);
      list.remove(-1);
      expect(list.toArray()).toEqual([2]);
    });

    it('should throw an error if the position is out of bounds', () => {
      list.append(1);
      expect(() => list.remove(1)).toThrow(
        LinkedList['errors'].getOutOfBounds(1, 1)
      );
    });
  });

  describe('clear', () => {
    it('should clear the entire list', () => {
      list.append(1);
      list.append(2);
      list.clear();
      expect(list.length).toBe(0);
      expect(list.head).toBeNull();
    });
  });

  describe('toArray and fromArray', () => {
    it('should convert the linked list to an array', () => {
      list.append(1);
      list.append(2);
      list.append(3);
      expect(list.toArray()).toEqual([1, 2, 3]);
    });

    it('should create a linked list from an array', () => {
      const listFromArray = LinkedList.fromArray([1, 2, 3]);
      expect(listFromArray.toArray()).toEqual([1, 2, 3]);
    });
  });

  describe('reverse', () => {
    it('should reverse the linked list', () => {
      list = LinkedList.fromArray([1, 2, 3, 4]);
      list.reverse();
      expect(list.toArray()).toEqual([4, 3, 2, 1]);
    });
  });

  describe('map, filter, reduce, and forEach', () => {
    beforeEach(() => {
      list = LinkedList.fromArray([1, 2, 3, 4]);
    });

    it('should apply map correctly', () => {
      list.map((x) => x * 2);
      expect(list.toArray()).toEqual([2, 4, 6, 8]);
    });

    it('should apply filter correctly', () => {
      list.filter((x) => x % 2 === 0);
      expect(list.toArray()).toEqual([2, 4]);
    });

    it('should apply reduce correctly', () => {
      const sum = list.reduce((acc, x) => acc + x, 0);
      expect(sum).toBe(10);
    });

    it('should apply forEach correctly', () => {
      const values: number[] = [];
      list.forEach((x) => values.push(x));
      expect(values).toEqual([1, 2, 3, 4]);
    });

    it('should handle empty lists', () => {
      list.clear();
      list.map((x) => x * 2);
      list.filter((x) => x % 2 === 0);
      const sum = list.reduce((acc, x) => acc + x, 0);
      expect(sum).toBe(0);

      const values: number[] = [];
      list.forEach((x) => values.push(x));
      expect(values).toEqual([]);
    });
  });
});
