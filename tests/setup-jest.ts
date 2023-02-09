import { config } from 'dotenv';

beforeAll(() => {
  config({
    path: '.env.test',
  });
});
