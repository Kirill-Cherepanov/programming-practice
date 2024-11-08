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

  public prepend(head: T): void {
    const headNode = new ListNode(head);
    if (this.headNode) headNode.next = this.headNode;
    this.headNode = headNode;
  }

  public append(next: T): void {
    const nextNode = new ListNode(next);
    if (!this.headNode) this.headNode = nextNode;
    else this.tailNode!.next = nextNode;
  }

  public get(position: number): T {
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

    return next.value;
  }

  public getFromEnd(position: number): T {
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
      length++;
    }

    const result = arr.at(position);
    if (!result) throw LinkedList.errors.getOutOfBounds(length, position);
    return result.value;
  }

  public at(position: number): T {
    if (position >= 0) return this.get(position);
    else return this.getFromEnd(-position);
  }

  public clear(): void {
    this.headNode = null;
  }

  public reverse(): void {
    throw new Error('Not implemented');
  }

  public set(position: number, value: T): void {
    throw new Error('Not implemented');
  }

  public insert(position: number, value: T): void {
    throw new Error('Not implemented');
  }

  public remove(position: number): void {
    throw new Error('Not implemented');
  }

  public toArray(): T[] {
    throw new Error('Not implemented');
  }
}
