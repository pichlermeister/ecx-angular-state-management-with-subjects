import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { SAMPLE_TODOS, Todo } from './todo.model';
import { TodosService } from './todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit, OnDestroy {
  todos: Todo[] = SAMPLE_TODOS;
  username: string;

  subscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subscription = this.authService.authState$.subscribe(
      (username) => (this.username = username)
    );
    //TODO: get todos form TodoService observable - don't forget to unsubscribe when not needed anymore to avoid memory leaks.
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  toggle(todo: Todo) {
    console.log(`toggled todo '${todo.title}'`);
    this.todos = this.todos.map((t) =>
      t.title === todo.title
        ? {
            ...todo,
            done: !todo.done,
            doneAt: !todo.done ? new Date() : null,
          }
        : t
    );

    //TOOD: use TodoService instead
  }

  onDelete(todo: Todo) {
    console.log('deleted todo', todo);
    this.todos = this.todos.filter((t) => t.title != todo.title);

    //TODO: use TodoService instead
  }

  onAdd(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const todo = form.value as Todo;
    console.log(todo);
    this.todos = [
      ...this.todos,
      {
        title: todo.title,
      },
    ];

    //TODO:use TodoService instead

    form.reset();
  }
}
