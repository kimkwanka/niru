import configureStore from 'redux-mock-store';
import { renameUser, toggleAuthenticated } from './userActions';

const user = {
  name: 'TestUsername',
  authenticated: true,
};

const mockStore = configureStore();
const initialState = { user };

let store = null;

describe('userActions', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('toggleAuthenticated() returns correct action', () => {
    store.dispatch(toggleAuthenticated());
    const actions = store.getActions();
    const expectedAction = {
      type: 'TOGGLE_AUTHENTICATED',
    };
    expect(actions).toEqual([expectedAction]);
  });

  it('renameUser(...) returns correct action', () => {
    store.dispatch(renameUser('NewUsername'));
    const actions = store.getActions();
    const expectedAction = {
      type: 'RENAME_USER',
      name: 'NewUsername',
    };
    expect(actions).toEqual([expectedAction]);
  });
});
