import { Component } from '@angular/core';
import { TeamEntrypoint } from '@features/team/team-entrypoint';

@Component({
  selector: 'app-root',
  imports: [TeamEntrypoint],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
