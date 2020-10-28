import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstructionsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('INSTRUCTIONS');
  }
}
