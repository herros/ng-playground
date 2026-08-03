import { Teams } from '@features/teams/components/display/teams';
import { Team } from '@models/team';
import { fireEvent, render, screen } from '@testing-library/angular';
import { teamFactory } from '../../../../shared/factories/team-factory';

const teams = teamFactory.buildList(2);

async function setup(selectedTeam: Team = new Team()) {
  const view = await render(Teams, {
    componentInputs: {
      teams,
      selectedTeam,
    },
  });
  const selected = vi.fn();
  const sort = vi.fn();

  view.fixture.componentInstance.selected.subscribe(selected);
  view.fixture.componentInstance.sort.subscribe(sort);

  return {
    selected,
    sort,
    view,
  };
}

describe('Teams', () => {
  it('should create', async () => {
    const { view } = await setup();

    expect(view.fixture.componentInstance).toBeTruthy();
  });

  it('should render the teams', async () => {
    await setup();

    expect(screen.getByText(teams[0].name as string)).toBeTruthy();
    expect(screen.getByText(teams[1].name as string)).toBeTruthy();
  });

  it('should show the selected team', async () => {
    const { view } = await setup(teams[1]);

    expect(view.container.textContent).toContain(`Selected team: ${teams[1].name}`);
  });

  it('should show when no team is selected', async () => {
    const { view } = await setup();
    expect(view.container.textContent).toContain('No team selected');
  });

  it('should emit the selected team key when a team is clicked', async () => {
    const { selected } = await setup();

    fireEvent.click(screen.getByText(teams[1].name as string));

    expect(selected).toHaveBeenCalledWith(teams[1].publicKey);
  });

  it('should emit sort payload when a header is clicked', async () => {
    const { sort } = await setup();

    fireEvent.click(screen.getByRole('button', { name: /sort by poule/i }));

    expect(sort).toHaveBeenCalledWith({ key: 'poule', direction: 'asc' });
  });

  it('should toggle to desc when the same header is clicked again', async () => {
    const { sort } = await setup();

    const header = screen.getByRole('button', { name: /sort by team/i });
    fireEvent.click(header);
    fireEvent.click(header);

    expect(sort).toHaveBeenLastCalledWith({ key: 'name', direction: 'desc' });
  });
});
