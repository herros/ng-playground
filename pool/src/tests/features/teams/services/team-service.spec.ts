import { TestBed } from '@angular/core/testing';
import { TeamService } from '@features/teams/services/team-service';

describe('TeamService', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  function setup() {
    TestBed.configureTestingModule({
      providers: [TeamService],
    });

    const service = TestBed.inject(TeamService);

    return { service };
  }

  it('should create', () => {
    const { service } = setup();

    expect(service).toBeTruthy();
  });

  it('should return a list of teams from getAll', async () => {
    const { service } = setup();

    const teams = await service.getAll(true);

    expect(Array.isArray(teams)).toBe(true);
    expect(teams.length).toBe(10);
  });

  it('should return teams with expected shape', async () => {
    const { service } = setup();

    const teams = await service.getAll(false);
    const team = teams[0];

    expect(team).toBeTruthy();
    expect(team.publicKey).not.toBeNull();
    expect(team.name).not.toBeNull();
    expect(team.poule).not.toBeNull();
  });

  it('should produce faker teams via getFakerTeams', () => {
    const { service } = setup();

    const teams = service.getFakerTeams();

    expect(Array.isArray(teams)).toBe(true);
    expect(teams.length).toBe(10);
  });
});
