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
    let prev: ListNode<T> | null = null;
    let curr = this.headNode;

    while (curr) {
      curr.next = prev;
      prev = curr;
      curr = curr.next;
    }
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

  private removeNode(prev?: ListNode<T> | null): void {
    if (!prev) this.headNode = this.headNode?.next ?? null;
    else prev.next = prev.next?.next ?? null;
  }

  // ! Somewhat inefficient here as it scans the list twice at this.length and this.atNode
  public remove(position: number): void {
    const isFirst =
      position === 0 || (position < 0 && this.length === -position);
    const prev = isFirst ? null : this.atNode(position - 1);
    this.removeNode(prev);
  }

  public toArray(): T[] {
    const arr = [] as T[];

    for (let next = this.headNode; next; next = next.next) {
      arr.push(next.value);
    }

    return arr;
  }

  [Symbol.iterator]() {
    let next = this.headNode;

    return {
      next() {
        if (next) {
          const value = next.value;
          next = next.next;
          return { value, done: false };
        } else {
          return { done: true };
        }
      },
    };
  }

  private iterate(
    callback: (
      node: ListNode<T>,
      index: number,
      prev?: ListNode<T> | null
    ) => void
  ): void {
    let index = 0;
    let prev: ListNode<T> | null = null;

    for (let node = this.headNode; node; node = node?.next ?? null) {
      callback(node, index, prev);
      index++;
      prev = node;
    }
  }

  public forEach(callback: (value: T, index: number) => void): void {
    this.iterate((node, index) => callback(node.value, index));
  }

  public map(callback: (value: T, index: number) => T): void {
    this.iterate((node, index) => {
      node.value = callback(node.value, index);
    });
  }

  public filter(callback: (value: T, index: number) => boolean): void {
    this.iterate((node, index, prev) => this.removeNode(prev));
  }

  public find(callback: (value: T, index: number) => boolean): T | undefined {
    let index = 0;

    for (let node = this.headNode; node; node = node?.next ?? null) {
      if (callback(node.value, index)) return node.value;
    }
  }

  public some(callback: (value: T, index: number) => boolean): boolean {
    return !!this.find(callback);
  }

  public every(callback: (value: T, index: number) => boolean): boolean {
    return !this.find((value, index) => !callback(value, index));
  }

  public reduce(
    callback: (accumulator: T, value: T, index: number) => T,
    initialValue: T
  ): T {
    let accumulator = initialValue;

    this.forEach((value, index) => {
      accumulator = callback(accumulator, value, index);
    });

    return accumulator;
  }

  public toString(): string {
    return this.toArray().join(', ');
  }
}
