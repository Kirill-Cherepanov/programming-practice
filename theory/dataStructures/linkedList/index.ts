import ListNode from './node';

export default class LinkedList<T> {
  public head: ListNode<T> | null;

  private static errors = {
    getOutOfBounds: (length: number, position: number) =>
      new Error(
        `The linked list is of length: ${length}. Tried to get a node at position ${position}.`
      ),
    getIncorrectInput: (info?: unknown) => new Error(`Incorrect input${info}`),
  };

  constructor(head: ListNode<T> | null = null) {
    this.head = head;
  }

  get tail(): ListNode<T> | null {
    let next = this.head;
    while (next?.next) next = next.next;
    return next ?? null;
  }

  get length(): number {
    throw new Error('Not implemented');
  }

  public prepend(head: ListNode<T>): void {
    if (this.head) head.next = this.head;
    this.head = head;
  }

  public append(next: ListNode<T>): void {
    if (!this.head) this.head = next;
    else this.tail!.next = next;
  }

  public get(position: number): ListNode<T> {
    if (position < 0) {
      throw LinkedList.errors.getIncorrectInput(
        ` negative position argument position=${position}`
      );
    }
    if (!this.head) throw LinkedList.errors.getOutOfBounds(0, position);

    let next = this.head;
    for (let i = 0; i !== position; i++) {
      if (!next.next) {
        throw LinkedList.errors.getOutOfBounds(i + 1, position);
      }
      next = next.next;
    }

    return next;
  }

  public getFromEnd(position: number): ListNode<T> {
    if (position < 0) {
      throw LinkedList.errors.getIncorrectInput(
        ` negative position argument position=${position}`
      );
    }
    if (!this.head) throw LinkedList.errors.getOutOfBounds(0, position);

    const arr = [];

    let length = 1;
    for (let next: ListNode<T> | null = this.head; next; next = next.next) {
      arr.push(next);
      length++;
    }

    const result = arr.at(position);
    if (!result) throw LinkedList.errors.getOutOfBounds(length, position);
    return result;
  }

  public at(position: number): ListNode<T> {
    if (position >= 0) return this.get(position);
    else return this.getFromEnd(-position);
  }

  public clear(): void {
    throw new Error('Not implemented');
  }

  public reverse(): void {
    throw new Error('Not implemented');
  }

  public set(position: number, value: ListNode<T>): void {
    throw new Error('Not implemented');
  }

  public insert(position: number, value: ListNode<T>): void {
    throw new Error('Not implemented');
  }

  public remove(position: number): void {
    throw new Error('Not implemented');
  }

  public toArray(): T[] {
    throw new Error('Not implemented');
  }
}
