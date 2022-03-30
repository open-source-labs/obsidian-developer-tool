import React from 'React';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime';

import Header from '../src/pages/Panel/Components/AppBar.tsx';
import Queries from '../src/pages/Panel/Components/Performance Components/Queries.tsx';
import Log from '../src/pages/Panel/Components/Performance Components/Log.tsx';
import PlaygroundHeader from '../src/pages/Panel/Components/PlaygroundHeader.tsx'
import QueryInput from '../src/pages/Panel/Components/QueryInput.tsx'

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
      // beforeEach(() => {
      //   const props = {
      //     onEndpointChange: jest.fn()
      //   };
      //   render(<PlaygroundHeader {...props} />)
      // })
      test('Endpoint submit button invokes function on click', () => {
        const props = {
          onEndpointChange: jest.fn()
        };
        render(<PlaygroundHeader {...props} />)
        const button = screen.getByRole('button')
        userEvent.click(button);
        expect(props.onEndpointChange).toHaveBeenCalledTimes(1);
        userEvent.click(button);
        expect(props.onEndpointChange).toHaveBeenCalledTimes(2);
      })

      test('Input value initially set to empty string with placeholder', () => {
        const props = {
          onEndpointChange: jest.fn()
        };
        render(<PlaygroundHeader {...props} />)
       const input = screen.getAllByDisplayValue('')
       expect(input.length).toBe(1)
       expect(input[0].getAttribute('placeholder')).toBe('Enter GraphQL endpoint here')
      })
      test('Input value changes with typing', () => {
        const props = {
          onEndpointChange: jest.fn()
        };
        render(<PlaygroundHeader {...props} />)
       const input = screen.getByDisplayValue('')
       userEvent.type(input, 'hello')
       const newInput = screen.getAllByDisplayValue('hello')
       expect(newInput.length).toBe(1)
      });
      test('Input value resets after button click', () => {
        const props = {
          onEndpointChange: jest.fn()
        };
        render(<PlaygroundHeader {...props} />)
       const input = screen.getAllByDisplayValue('')
       expect(input.length).toBe(1)

       userEvent.type(screen.getByDisplayValue(''), 'hello')
       const testInput = screen.queryAllByDisplayValue('')
       expect(testInput.length).toBe(0)
       const newInput = screen.getAllByDisplayValue('hello')
       expect(newInput.length).toBe(1)
       const button = screen.getByRole('button')
       userEvent.click(button);
       const clickInput = screen.getAllByDisplayValue('')
       expect(clickInput.length).toBe(1)
       const oldInput = screen.queryAllByDisplayValue('hello')
       expect(oldInput.length).toBe(0)
      });
    })
  });

  describe('Cache Tab', () => {});
});
