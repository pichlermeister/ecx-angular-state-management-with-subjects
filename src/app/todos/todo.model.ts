export class Todo {
  title: string;
  done?: boolean = false;
  doneAt?: Date;
}
export const SAMPLE_TODOS: Todo[] = [
  { title: 'checkout existing codebase' },
  { title: 'review how state is managed in authService' },
  { title: 'make use of TodoService to save the state' },
  {
    title:
      'test: navigating between "Instructions" and "TODOs" should preserve todos',
  },
  {
    title:
      'fix progress in header (TODO "0/5") should be updated according to done todos',
  },
];
