import React from 'react';
import './App.scss';
import { PeopleTable } from './Components/PeopleTable';
import peopleFromServer from './api/people.json';
import imgSort from './images/sort_both.png';
import imgDesc from './images/sort_desc.png';
import imgAsc from './images/sort_asc.png';

type State = {
  query: string;
  sortBy: keyof Person | '';
  sortCurrent: number;
  people: Person[];
};

class App extends React.Component<{}, State> {
  state: State = {
    query: '',
    sortBy: '',
    sortCurrent: 0,
    people: [...peopleFromServer as Person[]],
  };

  getImg = () => {
    const { sortCurrent } = this.state;
    let imgHolder = imgSort;

    if (sortCurrent === 0) {
      return imgHolder;
    }

    if (sortCurrent % 2 !== 0) {
      imgHolder = imgDesc;
    }

    if (sortCurrent % 2 === 0) {
      imgHolder = imgAsc;
    }

    return imgHolder;
  };

  getVisiblyPeople = () => {
    const {
      query, sortBy, people, sortCurrent,
    } = this.state;
    let visiblePeople = people;

    if (query) {
      const queryToLowerCase = query.toLowerCase();

      visiblePeople = people
        .filter(person => person.name.toLowerCase().includes(queryToLowerCase));
    }

    if (sortBy && sortCurrent % 2 !== 0) {
      visiblePeople = [...visiblePeople]
        .sort((a: Person, b: Person) => (
          a[sortBy] > b[sortBy] ? 1 : -1
        ));
    }

    if (sortBy && sortCurrent % 2 === 0) {
      visiblePeople = [...visiblePeople]
        .sort((a: Person, b: Person) => (
          a[sortBy] < b[sortBy] ? 1 : -1
        ));
    }

    return visiblePeople;
  };

  render() {
    const { query } = this.state;
    const visiblePeople = this.getVisiblyPeople();
    const imgHolder = this.getImg();

    return (
      <div className="App">
        <h1>
          People table
          <br />
          {query}
        </h1>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            this.setState({ query: e.target.value });
          }}
        />
        <button
          type="button"
          onClick={() => this.setState(
            {
              sortBy: '', sortCurrent: 0,
            },
          )}
        >
          Reset
        </button>

        <button
          type="button"
          onClick={() => this.setState((prev) => ({ sortBy: 'name', sortCurrent: prev.sortCurrent + 1 }))}
        >
          <img src={imgHolder} alt="Logo" />
        </button>
        {
          visiblePeople.length !== 0 && (
            <PeopleTable people={visiblePeople} />
          )
        }

      </div>
    );
  }
}

export default App;
