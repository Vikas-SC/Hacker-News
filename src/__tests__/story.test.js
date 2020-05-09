import React from 'react';
import { Story } from '../components/Story';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<Story></Story>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});