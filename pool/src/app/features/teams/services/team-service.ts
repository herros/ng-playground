import { Service } from '@angular/core';
import { Team } from '@models/team';
import { BaseService } from '@services/base';
import { lastValueFrom, of } from 'rxjs';
import { teamFactory } from '../../../../tests/shared/factories/team-factory';

@Service({ autoProvided: false })
export class TeamService extends BaseService {
  public getAll(skipLoader: boolean): Promise<Team[]> {
    void skipLoader;

    return lastValueFrom(
      // this.http.get<Team[]>(this.getUrl('team'), skipLoader ? this.skipLoader() : undefined),
      of(this.getFakerTeams()), // Mocking the API call for testing purposes
    );
  }

  /*
    Definetely a NO GO here, importing this teamFactory from the test folder is a bad practice,
    but for the sake of this example, we will use it to generate some fake data.
  */
  public getFakerTeams(): Team[] {
    return teamFactory.buildList(10);
  }
}
