import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App: React.FC = () => {
  const [sort, setSort] = useState<string[]>([...goodsFromServer]);
  const [reverse, setReverse] = useState<boolean>(false);
  const [active, setActive] = useState<string>('');

  const handleSort = (good: string): void => {
    let newSort: string[];

    switch (good) {
      case 'abc':
        if (reverse) {
          newSort = [...sort].sort((a, b) => b.localeCompare(a));
          setActive(good);
        } else {
          newSort = [...sort].sort((a, b) => a.localeCompare(b));
          setActive(good);
        }

        break;
      case 'length':
        if (reverse) {
          newSort = [...sort].sort((a, b) => b.length - a.length);
          setActive(good);
        } else {
          newSort = [...sort].sort((a, b) => a.length - b.length);
          setActive(good);
        }

        break;
      case 'reverse':
        if (active === 'abc' || active === 'length') {
          setReverse(!reverse);
        } else if (active === 'reverse') {
          setReverse(!reverse);
          setActive('');
        } else {
          setReverse(!reverse);
          setActive('reverse');
        }

        newSort = [...sort].reverse();
        break;
      default:
        setActive('');
        setReverse(false);
        newSort = [...goodsFromServer];
    }

    setSort(newSort);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${(active !== 'abc' ? 'is-light' : '') || (active !== 'abc' && reverse) ? 'is-light' : ''}`}
          onClick={() => handleSort('abc')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${(active !== 'length' ? 'is-light' : '') || (active !== 'length' && reverse) ? 'is-light' : ''}`}
          onClick={() => handleSort('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverse ? '' : 'is-light'}`}
          onClick={() => handleSort('reverse')}
        >
          Reverse
        </button>
        {active && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => handleSort('')}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sort.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
