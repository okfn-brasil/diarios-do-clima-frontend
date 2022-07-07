import { render } from '@testing-library/react';
import Footer from './Footer';
import React from "react";

test('renders the component', () => {
  const component = render(<Footer />);
  expect(!!component).toEqual(true);
});
