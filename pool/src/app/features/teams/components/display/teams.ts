import { Component, input, output } from '@angular/core';
import { Team } from '@models/team';

@Component({
  selector: 'app-teams',
  imports: [],
  templateUrl: './teams.html',
  styleUrl: './teams.scss',
})
export class Teams {
  teams = input.required<Team[]>();
  selectedTeam = input.required<Team>();
  selected = output<string>();
  sort = output<{ key: keyof Team; direction?: 'asc' | 'desc' }>();

  protected sortDirection?: 'asc' | 'desc' = undefined;
  protected sortField: keyof Team = 'name';

  public clicked(key: string | null): void {
    if (key !== null) {
      this.selected.emit(key);
    }
  }

  protected sortBy(key: keyof Team): void {
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

  protected getSortArrow(key: keyof Team): string {
    if (this.sortField !== key) {
      return '↕';
    }

    return this.sortDirection === 'asc' ? '↑' : this.sortDirection === 'desc' ? '↓' : '↕';
  }
}
