import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import About from './About';

describe('<About /> - Snapshot', () => {
  it('matches its snapshot', () => {
    const wrapper = shallow(<About />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
