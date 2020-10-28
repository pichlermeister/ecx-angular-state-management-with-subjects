import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { TodosService } from './todos/todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isAuthenticated = false;
  authSubscription: Subscription;

  doneTodoCount: number = 0; //number of finished todos
  todoCount: number = 5; //total number of todos

  constructor(
    public authService: AuthService,
    private todoService: TodosService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.authState$.subscribe(
      (username) => {
        this.isAuthenticated = !!username;
      }
    );

    //TODO: subscribe to todo-subject and update "doneTodoCount" and "todoCount"
    //Note: don't forget to to unsubscribe afterwards

    //SOLUTION
    this.authSubscription.add(
      this.todoService.todos$.subscribe((todos) => {
        console.debug('updating TODO status in navigation');
        this.doneTodoCount = todos.filter((t) => t.done).length;
        this.todoCount = todos.length;
      })
    );
  }
  ngOnDestroy(): void {
    this.authSubscription && this.authSubscription.unsubscribe();
  }

  onLogin(username: string): void {
    this.authService.login(username);
  }
  onLogout(): void {
    this.authService.logout();
  }
}
