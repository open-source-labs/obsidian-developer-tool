import React from 'React';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime';

import Header from '../src/pages/Panel/Components/AppBar.tsx';
import Queries from '../src/pages/Panel/Components/Performance Components/Queries.tsx';
import Log from '../src/pages/Panel/Components/Performance Components/Log.tsx';

describe('Unit testing React components', () => {
    describe('Side Bar', () => {
      const props = {
        count: 1,
        setCount: jest.fn()
      }
      render (<Header {...props}/>)
    });

  describe('Performance Tab', () => {
    //check amount of queries and mutation
    test('Number of query log components responds to number of query messages', () => {
      const props = {
        data: ['beans'],
        setGraphqlData: jest.fn(),
      };
      const test = render(<Queries {...props} />);
      const logs = screen.getAllByText('0. Query');
      expect(logs.length).toBe(1);
    });
    //check to see if graphql click event listener is activated
    test('Log functions invoked on click', () => {
      const props = {
        onClick: jest.fn(),
        name: 'test',
      };
      render(<Log {...props} />);
      const logs = screen.getByText(props.name);
      userEvent.click(logs);
      expect(props.onClick).toHaveBeenCalledTimes(1);
      userEvent.click(logs);
      expect(props.onClick).toHaveBeenCalledTimes(2);
    });
  });

  describe('Playground Tab', () => {});

  describe('Cache Tab', () => {});
});
