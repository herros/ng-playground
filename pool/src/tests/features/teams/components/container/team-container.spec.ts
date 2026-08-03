import { signal } from '@angular/core';
import { TeamContainer } from '@features/teams/components/container/team-container';
import { Teams } from '@features/teams/components/display/teams';
import { TeamStoreFacade } from '@features/teams/services/team-store-facade';
import { render, RenderResult, screen } from '@testing-library/angular';
import { MockComponent, ngMocks } from 'ng-mocks';
import { teamFactory } from '../../../../shared/factories/team-factory';

const teams = teamFactory.buildList(2);

type SetupResult = RenderResult<TeamContainer> & {
  sortOn: ReturnType<typeof vi.fn>;
};

async function setup(): Promise<SetupResult> {
  const sortOn = vi.fn();

  const view = await render(TeamContainer, {
    componentProviders: [
      {
        provide: TeamStoreFacade,
        useValue: {
          teams: signal(teams),
          selectedTeam: signal(teams[1]),
          title: 'TestValue',
          setSelectedTeam: vi.fn<(key: string) => void>(),
          sortOn,
        },
      },
    ],
    importOverrides: [{ replace: Teams, with: MockComponent(Teams) }],
  });

  await view.fixture.whenStable();
  view.fixture.detectChanges();

  return Object.assign(view, { sortOn }) as SetupResult;
}

describe('TeamContainer', () => {
  it('should create', async () => {
    const { fixture } = await setup();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should bind teams to the display component', async () => {
    await setup();
    const result = ngMocks.input('app-teams', 'teams');
    expect(result).toEqual(teams);
  });

  it('should render the title', async () => {
    await setup();
    // Title text will be set by the component
    expect(screen.getByText('Teams')).toBeTruthy();
  });

  it('should update the selected team when the display component emits a selection', async () => {
    const { fixture } = await setup();

    ngMocks.output<string>('app-teams', 'selected').emit(teams[1].publicKey as string);
    fixture.detectChanges();
    const result = ngMocks.input('app-teams', 'selectedTeam');
    expect(result).toEqual(teams[1]);
  });

  it('should forward sort events to the facade', async () => {
    const { fixture, sortOn } = await setup();

    ngMocks
      .output<{ key: 'name' | 'poule'; direction?: 'asc' | 'desc' }>('app-teams', 'sort')
      .emit({
        key: 'poule',
        direction: 'desc',
      });
    fixture.detectChanges();

    expect(sortOn).toHaveBeenCalledWith({ key: 'poule', direction: 'desc' });
  });
});
