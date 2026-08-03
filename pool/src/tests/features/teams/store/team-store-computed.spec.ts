import { TestBed } from '@angular/core/testing';
import { TeamService } from '@features/teams/services/team-service';
import { TeamStore } from '@features/teams/store/team.store';
import { Team } from '@models/team';

function setup(customTeams: Team[] = []) {
  const getAll = vi.fn().mockResolvedValue(customTeams);

  TestBed.configureTestingModule({
    providers: [
      TeamStore,
      {
        provide: TeamService,
        useValue: {
          getAll,
        },
      },
    ],
  });

  const store = TestBed.inject(TeamStore);

  return { store };
}

describe('TeamStore computed', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should return empty Team when no key is selected', async () => {
    const teams: Team[] = [{ publicKey: '1', name: 'Alpha', type: '', poule: 'A' }];
    const { store } = setup(teams);

    await store.getTeams();

    const selected = store.selectedTeam();
    expect(selected.publicKey).toBeNull();
    expect(selected.name).toBeNull();
  });

  it('should return matched team when selected key exists', async () => {
    const teams: Team[] = [
      { publicKey: '1', name: 'Alpha', type: '', poule: 'A' },
      { publicKey: '2', name: 'Zulu', type: '', poule: 'B' },
    ];
    const { store } = setup(teams);

    await store.getTeams();
    store.setSelected('2');

    expect(store.selectedTeam()).toEqual(teams[1]);
  });

  it('should return empty Team when selected key does not exist', async () => {
    const teams: Team[] = [{ publicKey: '1', name: 'Alpha', type: '', poule: 'A' }];
    const { store } = setup(teams);

    await store.getTeams();
    store.setSelected('missing');

    const selected = store.selectedTeam();
    expect(selected.publicKey).toBeNull();
    expect(selected.name).toBeNull();
  });
});
