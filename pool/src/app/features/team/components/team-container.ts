import { Component, inject, OnInit } from '@angular/core';
import { TeamStoreFacade } from '../services/team-store-facade';
import { Team } from './team';

@Component({
  selector: 'u2a-team-container',
  imports: [Team],
  templateUrl: './team-container.html',
  styleUrl: './team-container.scss',
})
export class TeamContainer implements OnInit {
  // Injects
  protected readonly facade = inject(TeamStoreFacade);
  // Inputs and Outputs (usually not present in containers)
  // Signals
  // Computed Signals
  // Variables
  protected selectedTeam = this.facade.selectedTeam;
  protected teams = this.facade.teams;
  // Effects (may be present, in constructor)
  // Public methods
  public ngOnInit(): void {
    this.facade.title = 'Teams';
  }
  // Protected methods
  // Private methods
}
