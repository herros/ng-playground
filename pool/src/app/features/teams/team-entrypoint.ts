import { Component } from '@angular/core';
import { TeamContainer } from './components/container/team-container';
import { TeamService } from './services/team-service';
import { TeamStoreFacade } from './services/team-store-facade';
import { TeamStore } from './store/team.store';

@Component({
  selector: 'app-team-entrypoint',
  imports: [TeamContainer],
  template: '<app-team-container></app-team-container>',
  providers: [TeamStore, TeamStoreFacade, TeamService],
})
export class TeamEntrypoint {}
