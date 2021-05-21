import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

describe('User entity', () => {
  let user: User;

  beforeEach(() => {
    user = new User();
    user.password = 'testPassword';
    user.salt = 'testSalt';
    bcrypt.hash = jest.fn();
  });

  describe('validatePassword', () => {
    it('returns ture as password is valid', async () => {
      bcrypt.hash.mockResolvedValue('testPassword');
      expect(bcrypt.hash).not.toHaveBeenCalled();
      const result = await user.validatePassword('123432');
      expect(bcrypt.hash).toHaveBeenCalledWith('123432', 'testSalt');
      expect(result).toEqual(true);
    });

    it('returns false as password in invalid', async () => {
      bcrypt.hash.mockResolvedValue('wrongPassword');
      expect(bcrypt.hash).not.toHaveBeenCalled();
      const result = await user.validatePassword('123456');
      expect(bcrypt.hash).toHaveBeenCalledWith('123456', 'testSalt');
      expect(result).toEqual(false);
    });
  });
});
