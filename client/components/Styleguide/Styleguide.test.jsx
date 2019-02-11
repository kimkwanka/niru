import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Styleguide from './Styleguide';

describe('<Styleguide /> - Snapshot', () => {
  it('matches its snapshot', () => {
    const wrapper = shallow(<Styleguide />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
