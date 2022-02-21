import { expect } from 'chai';
import {
  array,
  boolean,
  integer,
  map,
  object,
  string,
  zip,
} from './generators';
import { LOWER_CASE_LETTERS } from './generators/char';
import { fuzz, fuzzDescribe } from './fuzz';


type TUser = {
  username: string;
  roles: string[];
  active: boolean;
  birthday: Date;
};

const rolePart = string(5, 9, LOWER_CASE_LETTERS.concat('-'));
const randomRoleGenerator = map(
  zip([rolePart, rolePart]),
  ([part1, part2]) => `${part1}.${part2}`,
);
const randomRolesGenerator = array(randomRoleGenerator);

// if the need is common, a date generator can be done
const randomBirthdateGenerator = map(
  integer(0, Date.now()),
  timestamp => new Date(timestamp),
);

function getUserGenerators(
  rolesGenerator: () => Iterator<string[]>,
  birthdateGenerator: () => Iterator<Date>,
): () => IterableIterator<TUser> {
  return object({
    username: string(5, 15),
    roles: rolesGenerator,
    active: boolean(),
    birthday: birthdateGenerator,
  });
}

const userGenerators = getUserGenerators(
  randomRolesGenerator,
  randomBirthdateGenerator,
);

describe('fuzz examples', () => {
  describe('isUnderage', () => {
    function isUnderage(user: TUser): boolean {
    // Not perfect, but we don't care
      return new Date().getFullYear() - user.birthday.getFullYear() < 18;
    }

    const yearGenerator = (minAge, maxAge) => map(
      zip<number|Date>([integer(minAge, maxAge), randomBirthdateGenerator]),
      ([age, date]: [number, Date]) => {
        date.setFullYear(new Date().getFullYear() - age);
        return date;
      },
    );

    fuzz(
      getUserGenerators(randomRolesGenerator, yearGenerator(0, 17)),
      'returns true if the user is underage',
      (user) => {
        expect(isUnderage(user)).to.be.true;
      },
    );

    fuzz(
      getUserGenerators(randomRolesGenerator, yearGenerator(18, 200)),
      'returns false if the user is 18 or older',
      (user) => {
        expect(isUnderage(user)).to.be.false;
      },
    );
  });

  describe('hasRole', () => {
    function hasRole(user: TUser, role: string): boolean {
      return user.roles.includes(role);
    }

    const usersWithRoleGenerator = map(
      zip<string|TUser>([randomRoleGenerator, userGenerators]),
      ([role, user]: [string, TUser]) => [
        role,
        {...user, roles: [...user.roles, role]},
      ],
    );

    fuzzDescribe(
      usersWithRoleGenerator,
      'the role is included',
      ([role, user]: [string, TUser]) => {
        it('returns true', () => {
          expect(hasRole(user, role)).to.be.true;
        });
      },
    );


    const usersWithoutRoleGenerator = map(
      zip<string|TUser>([randomRoleGenerator, userGenerators]),
      ([role, user]: [string, TUser]) => [
        role,
        {...user, roles: user.roles.filter(userRole => userRole !== role)},
      ],
    );

    fuzzDescribe(
      usersWithoutRoleGenerator,
      'the role is not included',
      ([ role, user ]: [string, TUser]) => {
        it('returns false', () => {
          expect(hasRole(user, role)).to.be.false;
        });
      },
    );
  });

  describe('isActive', () => {
    function isActive(user: TUser): boolean {
      return user.active;
    }

    fuzz(
      userGenerators,
      'returns weather the user is active or not',
      (user) => {
        expect(isActive(user)).to.equal(user.active);
      },
    );
  });
});
