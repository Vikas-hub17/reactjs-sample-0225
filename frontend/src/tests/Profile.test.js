import React from 'react';
import { shallow } from 'enzyme';
import Profile from '../components/Profile';

describe('Profile Component', () => {
  it('should initially render loading state', () => {
    const wrapper = shallow(<Profile />);
    expect(wrapper.text()).toContain('Loading profile');
  });
});
