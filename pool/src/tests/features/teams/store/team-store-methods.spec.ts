import { TestBed } from '@angular/core/testing';
import { TeamService } from '@features/teams/services/team-service';
import { TeamStore } from '@features/teams/store/team.store';
import { Team } from '@models/team';

function setup(customTeams: Team[] | null = [], selectedKey?: string) {
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
  if (selectedKey) {
    store.setSelected(selectedKey);
  }

  return { store, getAll };
}

describe('TeamStore methods', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should fetch teams and patch state', async () => {
    const teams: Team[] = [
      { publicKey: '1', name: 'Alpha', type: '', poule: 'A' },
      { publicKey: '2', name: 'Zulu', type: '', poule: 'B' },
    ];
    const { store, getAll } = setup(teams);

    await store.getTeams(true);

    expect(getAll).toHaveBeenCalledWith(true);
    expect(store.teams()).toEqual(teams);
  });

  it('should fallback to empty teams when service returns null', async () => {
    const { store } = setup(null);

    await store.getTeams();

    expect(store.teams()).toEqual([]);
  });

  it('should patch selected key when setSelected is called', () => {
    const { store } = setup([]);

    store.setSelected('team-key-1');

    expect(store.selectedKey()).toBe('team-key-1');
  });
});
