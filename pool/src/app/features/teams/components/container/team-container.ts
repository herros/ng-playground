import { Component, inject, OnInit } from '@angular/core';
import { TeamStoreFacade } from '@features/teams/services/team-store-facade';
import { Teams } from '../display/teams';

@Component({
  selector: 'app-team-container',
  imports: [Teams],
  templateUrl: './team-container.html',
  styleUrl: './team-container.scss',
})
export class TeamContainer implements OnInit {
  protected readonly facade = inject(TeamStoreFacade);
  protected selectedTeam = this.facade.selectedTeam;
  protected teams = this.facade.teams;

  public ngOnInit(): void {
    this.facade.title = 'Teams';
  }
}
