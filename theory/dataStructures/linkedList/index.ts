import ListNode from './node';

export default class LinkedList<T> {
  public head: ListNode<T> | null;

  constructor(head: ListNode<T> | null = null) {
    this.head = head;
  }

  get tail(): ListNode<T> | null {
    let next = this.head?.next;
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
}
