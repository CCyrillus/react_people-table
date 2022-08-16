import React from 'react';
import './PeopleTable.scss';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = (props) => {
  const { people } = props;

  const nameTable: string[] = Object.keys(people[0]);

  return (
    <>
      <table>
        <thead>
          <tr>
            {nameTable.map(item => (
              <th key={item}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {people.map(person => (
            <tr key={person.name}>
              {Object.values(person).map(item => (
                <td key={item}>{item}</td>
              ))}
            </tr> // первое значение массива это имя
          ))}
        </tbody>
      </table>
    </>
  );
};
