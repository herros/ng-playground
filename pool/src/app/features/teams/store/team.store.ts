import { withSorting } from '@app/shared/storefeatures/with-sorting';
import { Team } from '@models/team';
import { signalStore, withFeature, withHooks } from '@ngrx/signals';
import { withTeamStoreComputed } from './team-store.computed';
import { withTeamStoreMethods } from './team-store.methods';
import { withTeamStoreState } from './team-store.state';

export const TeamStore = signalStore(
  withTeamStoreState(),
  // using the withFeature to add the withSorting feature by means of a factory,
  // which allows us to pass the teams signal from the store to the withSorting feature.
  // creating a better and cleaner separation
  withFeature((store) => withSorting<Team>(store.teams)),
  // same thing below (in comment) but without the factory, which is less clean
  // and less flexible because it give a lot of typescript issues with types
  // withSorting<Team, ITeamState>((store) => store.teams),
  withTeamStoreMethods(),
  withTeamStoreComputed(),
  withHooks({
    onInit: (store): void => {
      store.setSort('name', 'asc'); // Default sort by name ascending
      store.getTeams().catch((error) => {
        console.error('Error loading teams on store init:', error);
      });
    },
  }),
);

export type TeamStoreType = InstanceType<typeof TeamStore>;
