import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { SAMPLE_TODOS, Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private todosSubject = new BehaviorSubject<Todo[]>(SAMPLE_TODOS);

  todos$ = this.todosSubject.asObservable();

  username: string;

  constructor(authService: AuthService) {
    authService.authState$
      .pipe(filter((username) => !!username)) //only when logged in!
      .subscribe((username) => {
        const savedTodos = localStorage.getItem(`todos_${username}`);
        savedTodos && this.todosSubject.next(JSON.parse(savedTodos));
      });

    //save automatically whenevery something has changed and user is logged in
    combineLatest([this.todos$, authService.authState$]).subscribe(
      ([todos, username]) => {
        if (!!username) {
          console.debug('saving todos for ' + username);
          localStorage.setItem(`todos_${username}`, JSON.stringify(todos));
        }
      }
    );
  }

  add(todo: Todo) {
    this.todosSubject.next([...this.todosSubject.getValue(), { ...todo }]);
  }

  remove(todo: Todo) {
    //TODO: implement remove functionality
    // SOLUTION
    this.todosSubject.next(
      this.todosSubject.getValue().filter((t) => t.title != todo.title)
    );
  }

  toggle(todo: Todo) {
    this.todosSubject.next(
      this.todosSubject.getValue().map((t) =>
        t.title === todo.title
          ? {
              ...todo,
              done: !todo.done,
              doneAt: !todo.done ? new Date() : null,
            }
          : t
      )
    );
  }
}
