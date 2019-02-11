import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ConnectedHome, { Home } from './Home';

const user = {
  name: 'TestUsername',
  authenticated: true,
};

const dispatch = () => {};

describe('<Home /> - Snapshot', () => {
  it('matches its snapshot', () => {
    const wrapper = shallow(<Home {...{ user, dispatch }} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe('<Home /> - Shallow render undecorated component', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(<Home {...{ user, dispatch }} />);
    expect(wrapper).toHaveLength(1);
  });
  it('renders the user name', () => {
    const wrapper = shallow(<Home {...{ user, dispatch }} />);
    expect(wrapper.find('h4 span').at(0).text()).toBe(' TestUsername');
  });
  it('renders the user authentication status: true', () => {
    const wrapper = shallow(<Home {...{ user, dispatch }} />);
    expect(wrapper.find('h4 span').at(1).text()).toBe(' true');
  });
  it('renders the user authentication status: false', () => {
    const falseUser = {
      name: 'TestUsername',
      authenticated: false,
    };
    const wrapper = shallow(<Home user={falseUser} dispatch={dispatch} />);
    expect(wrapper.find('h4 span').at(1).text()).toBe(' false');
  });
});

describe('<Home /> - Mount Redux connected component', () => {
  const mockStore = configureStore();
  const initialState = { user };

  let store = null;
  let wrapper = null;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <ConnectedHome />
      </Provider>,
    );
  });

  it('renders without exploding', () => {
    expect(wrapper.find(Home)).toHaveLength(1);
  });

  it('handles input change', () => {
    wrapper.find('input').simulate('change', {
      target: { value: 'NewUsername' },
    });
    const actions = store.getActions();
    const expectedAction = {
      type: 'RENAME_USER',
      name: 'NewUsername',
    };
    expect(actions).toEqual([expectedAction]);
  });

  it('handles clicks', () => {
    wrapper.find('button').simulate('click');
    const actions = store.getActions();
    const expectedAction = {
      type: 'TOGGLE_AUTHENTICATED',
    };
    expect(actions).toEqual([expectedAction]);
  });
});
