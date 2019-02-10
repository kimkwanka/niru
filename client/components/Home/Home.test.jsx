import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ConnectedHome, { Home } from './Home';

const testUser = {
  name: 'TestUsername',
  authenticated: true,
};

describe('<Home /> - Snapshot', () => {
  it('matches its snapshot', () => {
    const wrapper = shallow(<Home user={testUser} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe('<Home /> - Shallow render undecorated component', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(<Home user={testUser} />);
    expect(wrapper).toHaveLength(1);
  });
});

describe('<Home /> - Mount Redux connected component', () => {
  const mockStore = configureStore();
  const initialState = { user: testUser };

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
});
