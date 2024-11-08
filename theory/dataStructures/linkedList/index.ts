import ListNode from './node';

export default class LinkedList<T> {
  public head: ListNode<T> | null;

  private static errors = {
    getOutOfBounds: (length: number, position: number) =>
      new Error(
        `The linked list is of length: ${length}. Tried to get a node at position ${position}.`
      ),
    getIncorrectInput: () => new Error('Incorrect input'),
  };

  constructor(head: ListNode<T> | null = null) {
    this.head = head;
  }

  get tail(): ListNode<T> | null {
    let next = this.head;
    while (next?.next) next = next.next;
    return next ?? null;
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
    if (position < 0) throw LinkedList.errors.getIncorrectInput();
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
}
