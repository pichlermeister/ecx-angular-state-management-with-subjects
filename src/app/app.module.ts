import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { InstructionsComponent } from './instructions/instructions.component';
import { TodosComponent } from './todos/todos.component';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faSadTear,
  faSmileBeam,
  faUserCircle,
} from '@fortawesome/free-regular-svg-icons';
import {
  faTrash,
  faSmileWink,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TimeagoModule } from 'ngx-timeago';

const routes: Routes = [
  { path: 'todo', component: TodosComponent },
  { path: '', component: InstructionsComponent },
];
@NgModule({
  declarations: [AppComponent, InstructionsComponent, TodosComponent],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule.forRoot(routes),
    TimeagoModule.forRoot(),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faTrash,
      faSmileWink,
      faCheck,
      faUserCircle,
      faSadTear,
      faSmileBeam
    );
  }
}
