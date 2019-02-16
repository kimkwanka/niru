import userReducer from './userReducer';

describe('userReducer', () => {
  it('returns the initial state', () => {
    const state = userReducer(undefined, {});
    const expectedState = {
      name: 'default_username',
      authenticated: false,
    };
    expect(state).toEqual(expectedState);
  });
  it('handles TOGGLE_AUTHENTICATED', () => {
    const state = userReducer(undefined, {
      type: 'TOGGLE_AUTHENTICATED',
    });
    const expectedState = {
      name: 'default_username',
      authenticated: true,
    };
    expect(state).toEqual(expectedState);
  });
  it('handles RENAME_USER', () => {
    const state = userReducer(undefined, {
      type: 'RENAME_USER',
      name: 'NewUsername',
    });
    const expectedState = {
      name: 'NewUsername',
      authenticated: false,
    };
    expect(state).toEqual(expectedState);
  });
});
