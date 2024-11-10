import { IListNode } from '@/theory/data-structures/interfaces/linked-list';

export default class ListNode<T> implements IListNode<T> {
  public value: T;
  public next: ListNode<T> | null;

  constructor(value: T, next: ListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }

  public toString(): string {
    return `${this.value}`;
  }
}
