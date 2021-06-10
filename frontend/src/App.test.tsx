import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { unmountComponentAtNode } from 'react-dom';
import { JsxElement } from 'typescript';





/*
@author tobiasmaneschijn
*/
test('renders board', async () => {
  const app = render(<App />);
  const board = await app.findByTestId('board')
  expect(board).toBeInTheDocument();
});
