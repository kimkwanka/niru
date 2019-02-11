import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import NotFound404 from './NotFound404';

describe('<NotFound404 /> - Snapshot', () => {
  it('matches its snapshot', () => {
    const wrapper = shallow(<NotFound404 />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
