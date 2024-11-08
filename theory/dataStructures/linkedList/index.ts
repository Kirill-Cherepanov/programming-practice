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
}
