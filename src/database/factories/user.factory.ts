import { User, UserRole } from '../../users/entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';
export default setSeederFactory(User, async (faker) => {
  const user = new User();

  user.email = faker.internet.email();
  user.password = faker.internet.password();
  user.role = faker.helpers.arrayElement([UserRole.ADMIN, UserRole.USER]);

  return user;
});
