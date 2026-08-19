import { Component } from '@angular/core';
import { TeamService } from '../team/services/team-service';
import { TeamContainer } from './components/team-container';
import { TeamStoreFacade } from './services/team-store-facade';
import { TeamStore } from './store/team.store';

@Component({
  selector: 'u2a-team-entrypoint',
  imports: [TeamContainer],
  template: '<u2a-team-container></u2a-team-container>',
  providers: [TeamStore, TeamStoreFacade, TeamService],
})
export class TeamEntrypoint {}
