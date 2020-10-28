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

  constructor(
    private authService: AuthService,
    private todoService: TodosService
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.authState$.subscribe(
      (username) => (this.username = username)
    );
    //TODO: get todos form TodoService observable - don't forget to unsubscribe when not needed anymore to avoid memory leaks.
    //SOLUTION
    //NOTE: you can also assign it to a dedicated subscription variable and unsubscribe in ngOnDestroy().
    //      in this case I've chosed the way to attach it to an existing subscription, which has the same lifecycle and gets unsubscribed in ngOnDestroy().
    this.subscription.add(
      this.todoService.todos$.subscribe((todos) => (this.todos = todos))
    );
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  toggle(todo: Todo) {
    console.log(`toggled todo '${todo.title}'`);
    // this.todos = this.todos.map((t) =>
    //   t.title === todo.title
    //     ? {
    //         ...todo,
    //         done: !todo.done,
    //         doneAt: !todo.done ? new Date() : null,
    //       }
    //     : t
    // );

    //TOOD: use TodoService instead
    //SOLUTION
    this.todoService.toggle(todo);
  }

  onDelete(todo: Todo) {
    console.log('deleted todo', todo);
    // this.todos = this.todos.filter((t) => t.title != todo.title);

    //TODO: use TodoService instead
    //SOLUTION:
    this.todoService.remove(todo);
  }

  onAdd(form: NgForm) {
    if (!form.valid) {
      return;
    }

    // const todo = form.value as Todo;
    // console.log(todo);
    // this.todos = [
    //   ...this.todos,
    //   {
    //     title: todo.title,
    //   },
    // ];

    //TODO:use TodoService instead
    //SOLUTION:
    this.todoService.add({
      title: form.value.title,
    }); //SOLUTION

    form.reset();
  }
}
