import { TestBed } from '@angular/core/testing';
import { TeamService } from '@features/teams/services/team-service';
import { TeamStoreFacade } from '@features/teams/services/team-store-facade';
import { TeamStore } from '@features/teams/store/team.store';
import { Team } from '@models/team';
import { teamFactory } from '../../../shared/factories/team-factory';

// The store always sorts the teams on name immediately, so we have to do that too
const teams = teamFactory
  .buildList(2)
  .sort((a, b) => (a.name as string).localeCompare(b.name as string));

async function setup(customTeams: Team[] = teams) {
  const getAll = vi.fn().mockResolvedValue(customTeams);

  TestBed.configureTestingModule({
    providers: [
      TeamStore,
      TeamStoreFacade,
      {
        provide: TeamService,
        useValue: {
          getAll,
        },
      },
    ],
  });

  const facade = TestBed.inject(TeamStoreFacade);
  const store = TestBed.inject(TeamStore);

  await store.getTeams();
  getAll.mockClear();

  return {
    facade,
    getAll,
  };
}

describe('TeamStoreFacade', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', async () => {
    const { facade } = await setup();
    expect(facade).toBeTruthy();
  });

  it('should expose the teams signal', async () => {
    const { facade } = await setup();
    expect(facade.teams()).toEqual(teams);
  });

  it('should expose the selected team signal', async () => {
    const { facade } = await setup();

    facade.setSelectedTeam(teams[1].publicKey as string);

    expect(facade.selectedTeam()).toEqual(teams[1]);
  });

  it('should not allow selected team to be set directly', async () => {
    const { facade } = await setup();

    expect(() => {
      facade.selectedTeam = new Team();
    }).toThrow('Do not set selectedTeam directly. Use setSelectedTeam() instead.');
  });

  it('should refresh teams and return the current teams', async () => {
    const { facade, getAll } = await setup();

    const currentTeams = await facade.refreshTeams(true);

    expect(currentTeams).toEqual(teams);
    expect(getAll).toHaveBeenCalledWith(true);
  });

  it('should sort teams by name descending', async () => {
    const fixedTeams: Team[] = [
      { publicKey: '1', name: 'Alpha', type: '', poule: 'B' },
      { publicKey: '2', name: 'Zulu', type: '', poule: 'A' },
      { publicKey: '3', name: 'Mike', type: '', poule: 'C' },
    ];

    const { facade } = await setup(fixedTeams);

    facade.sortOn({ key: 'name', direction: 'desc' });

    expect(facade.teams().map((team) => team.name)).toEqual(['Zulu', 'Mike', 'Alpha']);
  });

  it('should sort teams by poule ascending', async () => {
    const fixedTeams: Team[] = [
      { publicKey: '1', name: 'Alpha', type: '', poule: 'B' },
      { publicKey: '2', name: 'Zulu', type: '', poule: 'A' },
      { publicKey: '3', name: 'Mike', type: '', poule: 'C' },
    ];

    const { facade } = await setup(fixedTeams);

    facade.sortOn({ key: 'poule', direction: 'asc' });

    expect(facade.teams().map((team) => team.poule)).toEqual(['A', 'B', 'C']);
  });
});
