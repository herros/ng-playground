import { faker } from '@faker-js/faker/locale/en_GB';
import { Team } from '@models/team';
import { Factory } from 'fishery';

faker.seed(20260713);

export const teamFactory = Factory.define<Team>(() => {
  return {
    publicKey: faker.string.uuid(),
    name: faker.location.country(),
    type: ' ',
    poule: faker.helpers.arrayElement(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']),
  } as Team;
});
