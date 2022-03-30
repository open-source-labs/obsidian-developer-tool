import React from 'React';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime';

import Header from '../src/pages/Panel/Components/AppBar.tsx';
import Queries from '../src/pages/Panel/Components/Performance Components/Queries.tsx';
import Log from '../src/pages/Panel/Components/Performance Components/Log.tsx';

describe('Unit testing React components', () => {
    describe('Side Bar', () => {
      test('Header is mounted', () => {
        const props = {
        count: 1,
        setCount: jest.fn()
      }
      render (<Header {...props}/>)
      const header = screen.getAllByText('Obsidian Developer Tool')
      expect(header.length === 1)
      })
    });

  describe('Performance Tab', () => {
    //check amount of queries and mutation
    test('Number of query log components responds to number of query messages', () => {
      const props = {
        data: ['beans', 2, 3],
        setGraphqlData: jest.fn(),
      };
      const test = render(<Queries {...props} />);
      const logs0 = screen.getAllByText('0. Query');
      expect(logs0.length).toBe(1);
      const logs1 = screen.getAllByText('1. Query');
      expect(logs1.length).toBe(1);
      const logs2 = screen.getAllByText('2. Query');
      expect(logs2.length).toBe(1);
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

  describe('Playground Tab', () => {
    describe ('Endpoint submit button', () => {
      beforeAll (() => {
      const props = {
        onEndpointChange = jest.fn();

      }
      });
      test('Endpoint submit button invokes function on click', () => {

      })
      test('Input value reset after clicking endpoint submit button', () => {
  
      })
    })
  });

  describe('Cache Tab', () => {});
});
