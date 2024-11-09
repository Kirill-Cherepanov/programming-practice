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

  // Time: O(1); Space: O(1)
  constructor(headValue: T | null = null) {
    this.headNode = headValue != null ? new ListNode(headValue) : null;
  }

  // Time: O(n); Space: O(n)
  public static fromArray<T>(arr: T[]): LinkedList<T> {
    const list = new LinkedList<T>(arr[0] ?? null);
    for (let i = arr.length - 1; i >= 0; i--) {
      list.prepend(arr[i]);
    }
    return list;
  }

  // Time: O(n); Space: O(n)
  public toArray(): T[] {
    const arr = [] as T[];

    for (let next = this.headNode; next; next = next.next) {
      arr.push(next.value);
    }

    return arr;
  }

  // Time: O(n); Space: O(1)
  private get tailNode(): ListNode<T> | null {
    let next = this.headNode;
    while (next?.next) next = next.next;
    return next ?? null;
  }

  // Time: O(n); Space: O(1)
  get tail(): T | null {
    return this.tailNode?.value ?? null;
  }

  // Time: O(1); Space: O(1)
  get head(): T | null {
    return this.headNode?.value ?? null;
  }

  // Time: O(n); Space: O(1)
  get length(): number {
    let length = 0;
    for (let next = this.headNode; next; next = next.next) length++;
    return length;
  }

  // Time: O(position); Space: O(1)
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

  // Same as getNode
  public get(position: number): T {
    return this.getNode(position).value;
  }

  // Time: O(n); Space: O(1)
  private getNodeFromEnd(position: number): ListNode<T> {
    if (position < 0) {
      throw LinkedList.errors.getIncorrectInput(
        ` negative position argument position=${position}`
      );
    }
    if (!this.headNode) throw LinkedList.errors.getOutOfBounds(0, position);

    let target: ListNode<T> | null = null;
    this.iterate((node, index) => {
      if (index > position) target = target ? target.next : this.headNode;
    });

    if (!target) throw LinkedList.errors.getOutOfBounds(length, position);
    return target;
  }

  // Same as getNodeFromEnd
  public getFromEnd(position: number): T {
    return this.getNodeFromEnd(position).value;
  }

  // position >= 0 : Time: O(position); Space: O(1)
  // position < 0 : Time: O(n); Space: O(1)
  private atNode(position: number): ListNode<T> {
    if (position >= 0) return this.getNode(position);
    else return this.getNodeFromEnd(-position);
  }

  // Same as atNode
  public at(position: number): T {
    return this.atNode(position).value;
  }

  // Same as atNode
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

  // Time: O(n); Space: O(1)
  public append(value: T): void {
    this.insert(-1, value);
  }

  // Time: O(1); Space: O(1)
  public prepend(value: T): void {
    this.insert(0, value);
  }

  // Same as atNode
  public set(position: number, value: T): void {
    const node = this.atNode(position);
    node.value = value;
  }

  // Time: O(1); Space: O(1)
  private removeNode(prev: ListNode<T> | null): void {
    if (!prev) this.headNode = this.headNode?.next ?? null;
    else prev.next = prev.next?.next ?? null;
  }

  // ! Somewhat inefficient here as it scans the list twice at this.length and this.atNode
  // Same as atNode
  public remove(position: number): void {
    const isFirst =
      position === 0 || (position < 0 && this.length === -position);
    const prev = isFirst ? null : this.atNode(position - 1);
    this.removeNode(prev);
  }

  // Time: O(1); Space: O(1)
  public clear(): void {
    this.headNode = null;
  }

  // Time: O(n); Space: O(1)
  public reverse(): void {
    let prev: ListNode<T> | null = null;
    let curr = this.headNode;

    while (curr) {
      curr.next = prev;
      prev = curr;
      curr = curr.next;
    }
  }

  // Time: O(n); Space: O(1)
  public toString(): string {
    let string = '';
    for (let value of this) string += `${value} -> `;
    return string.slice(0, -4);
  }

  // Time: O(n); Space: O(1)
  [Symbol.iterator]() {
    let next = this.headNode;

    return {
      next() {
        const value = next?.value ?? null;
        next = next?.next ?? null;
        return { value, done: !!next?.next };
      },
    };
  }

  // Time: O(n); Space: O(1)
  private iterate(
    callback: (
      node: ListNode<T>,
      index: number,
      prev: ListNode<T> | null
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

  // Time: O(n); Space: O(1)
  public forEach(callback: (value: T, index: number) => void): void {
    this.iterate((node, index) => callback(node.value, index));
  }

  // Time: O(n); Space: O(1)
  public map(callback: (value: T, index: number) => T): void {
    this.iterate((node, index) => {
      node.value = callback(node.value, index);
    });
  }

  // Time: O(n); Space: O(n)
  public filter(callback: (value: T, index: number) => boolean): void {
    const toDelete = new LinkedList<ListNode<T> | null>();

    this.iterate((node, index, prev) => {
      if (!callback(node.value, index)) toDelete.prepend(prev);
    });

    for (let node of toDelete) this.removeNode(node);
  }

  // Time: O(n); Space: O(1)
  public find(callback: (value: T, index: number) => boolean): T | undefined {
    let index = 0;

    for (let node = this.headNode; node; node = node?.next ?? null) {
      if (callback(node.value, index)) return node.value;
    }
  }

  // Time: O(n); Space: O(1)
  public some(callback: (value: T, index: number) => boolean): boolean {
    return !!this.find(callback);
  }

  // Time: O(n); Space: O(1)
  public every(callback: (value: T, index: number) => boolean): boolean {
    return !this.find((value, index) => !callback(value, index));
  }

  // Time: O(n); Space: O(1)
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
}
