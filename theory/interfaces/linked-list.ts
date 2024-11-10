export interface IListNode<T> {
  value: T;

  next: IListNode<T> | null;

  toString(): string;
}

export interface LinkedListStatic<T> {
  new (headValue?: T | null): ILinkedList<T>;

  fromArray(arr: T[]): ILinkedList<T>;
}

export interface ILinkedList<T> {
  head: T | null;

  tail: T | null;

  length: number;

  toArray(): T[];

  get(position: number): T;

  getFromEnd(position: number): T;

  at(position: number): T;

  insert(position: number, value: T): void;

  append(value: T): void;

  prepend(value: T): void;

  set(position: number, value: T): void;

  clear(): void;

  remove(position: number): void;

  reverse(): void;

  toString(): string;

  [Symbol.iterator](): IterableIterator<T>;

  forEach(callback: (value: T, index: number) => void): void;

  map(callback: (value: T, index: number) => T): void;

  filter(callback: (value: T, index: number) => boolean): void;

  find(callback: (value: T, index: number) => boolean): T | undefined;

  some(callback: (value: T, index: number) => boolean): boolean;

  every(callback: (value: T, index: number) => boolean): boolean;

  reduce(callback: (acc: T, value: T, index: number) => T, initialValue: T): T;
}
