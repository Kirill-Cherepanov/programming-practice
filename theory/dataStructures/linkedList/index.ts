import ListNode from './node';

export default class LinkedList<T> {
  private headNode: ListNode<T> | null;

  private static errors = {
    getOutOfBounds: (length: number, position: number) =>
      new Error(
        `The linked list is of length: ${length}. Tried to get a node at position ${position}.`
      ),
    getIncorrectInput: (info?: unknown) => new Error(`Incorrect input${info}`),
  };

  constructor(headValue: T | null = null) {
    this.headNode = headValue != null ? new ListNode(headValue) : null;
  }

  private get tailNode(): ListNode<T> | null {
    let next = this.headNode;
    while (next?.next) next = next.next;
    return next ?? null;
  }

  get tail(): T | null {
    return this.tailNode?.value ?? null;
  }

  get head(): T | null {
    return this.headNode?.value ?? null;
  }

  get length(): number {
    throw new Error('Not implemented');
  }

  private getNode(position: number): ListNode<T> {
    if (position < 0) {
      throw LinkedList.errors.getIncorrectInput(
        ` negative position argument position=${position}`
      );
    }
    if (!this.headNode) throw LinkedList.errors.getOutOfBounds(0, position);

    let next = this.headNode;
    for (let i = 0; i !== position; i++) {
      if (!next.next) {
        throw LinkedList.errors.getOutOfBounds(i + 1, position);
      }
      next = next.next;
    }

    return next;
  }

  public get(position: number): T {
    return this.getNode(position).value;
  }

  private getNodeFromEnd(position: number): ListNode<T> {
    if (position < 0) {
      throw LinkedList.errors.getIncorrectInput(
        ` negative position argument position=${position}`
      );
    }
    if (!this.headNode) throw LinkedList.errors.getOutOfBounds(0, position);

    const arr = [];

    let length = 1;
    for (let next: ListNode<T> | null = this.headNode; next; next = next.next) {
      arr.push(next);
      if (arr.length === position + 1) arr.shift();
      length++;
    }

    if (arr.length !== position) {
      throw LinkedList.errors.getOutOfBounds(length, position);
    }
    return arr[0];
  }

  public getFromEnd(position: number): T {
    return this.getNodeFromEnd(position).value;
  }

  private atNode(position: number): ListNode<T> {
    if (position >= 0) return this.getNode(position);
    else return this.getNodeFromEnd(-position);
  }

  public at(position: number): T {
    return this.atNode(position).value;
  }

  public clear(): void {
    this.headNode = null;
  }

  public reverse(): void {
    throw new Error('Not implemented');
  }

  public set(position: number, value: T): void {
    const node = this.atNode(position);
    node.value = value;
  }

  public insert(position: number, value: T): void {
    const node = new ListNode(value);

    if (position === 0) {
      node.next = this.headNode;
      this.headNode = node;
    } else {
      const prev = this.atNode(position - Number(position > 0));
      node.next = prev.next;
      prev.next = node;
    }
  }

  public append(value: T): void {
    this.insert(-1, value);
  }

  public prepend(value: T): void {
    this.insert(0, value);
  }

  public remove(position: number): void {
    throw new Error('Not implemented');
  }

  public toArray(): T[] {
    const arr = [] as T[];

    for (let next = this.headNode; next; next = next.next) {
      arr.push(next.value);
    }

    return arr;
  }
}
