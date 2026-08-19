import { Component, input, output } from '@angular/core';
import { Team as TeamModel } from '@models/team';

@Component({
  selector: 'u2a-team',
  imports: [],
  templateUrl: './team.html',
  styleUrl: './team.scss',
})
export class Team {
  /****************************************/
  /* Inputs                               */
  /****************************************/
  teams = input.required<TeamModel[]>();
  selectedTeam = input.required<TeamModel>();

  /****************************************/
  /* Outputs                              */
  /****************************************/
  selected = output<string>();
  sort = output<{ key: keyof TeamModel; direction?: 'asc' | 'desc' }>();

  /****************************************/
  /* Signals                              */
  /****************************************/
  /****************************************/
  /* Computed Signals                     */
  /****************************************/
  /****************************************/
  /* Variables                            */
  /****************************************/
  protected sortDirection?: 'asc' | 'desc' = undefined;
  protected sortField: keyof TeamModel = 'name';

  /****************************************/
  /* Effects (if present, in constructor) */
  /****************************************/
  /****************************************/
  /* Public methods                       */
  /****************************************/
  public clicked(key: string | null): void {
    if (key !== null) {
      this.selected.emit(key);
    }
  }

  /****************************************/
  /* Protected methods                    */
  /****************************************/
  protected sortBy(key: keyof TeamModel): void {
    if (this.sortField !== key) {
      this.sortField = key;
      this.sortDirection = 'asc';
    } else if (this.sortDirection === undefined) {
      this.sortDirection = 'asc';
    } else if (this.sortDirection === 'asc') {
      this.sortDirection = 'desc';
    } else {
      this.sortDirection = undefined;
      this.sortField = 'name';
    }

    this.sort.emit({ key: this.sortField, direction: this.sortDirection });
  }

  protected getSortArrow(key: keyof TeamModel): string {
    if (this.sortField !== key) {
      return '↕';
    }

    return this.sortDirection === 'asc' ? '↑' : this.sortDirection === 'desc' ? '↓' : '↕';
  }

  /****************************************/
  /* Private methods                      */
  /****************************************/
}
