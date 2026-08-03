import { App } from '@app/app';
import { fireEvent, render, screen } from '@testing-library/angular';

describe('App', () => {
  it('should create the app', async () => {
    const { fixture } = await render(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the team container', async () => {
    const { container } = await render(App);
    const teamsHost = container.querySelector('app-teams');

    expect(teamsHost?.textContent).toContain('No team selected');
  });

  it('should render teams page title from container initialization', async () => {
    await render(App);

    expect(screen.getByRole('heading', { level: 1, name: 'Teams' })).toBeTruthy();
  });

  it('should update selected label after clicking a team name', async () => {
    await render(App);

    const teamButtons = screen
      .getAllByRole('button')
      .filter((button) => !button.getAttribute('aria-label'));
    fireEvent.click(teamButtons[0]);

    expect(screen.getByText(/Selected team:/)).toBeTruthy();
  });
});
