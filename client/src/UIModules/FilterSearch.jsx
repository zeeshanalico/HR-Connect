import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const FilterSearch = ({ data, onFilter,onFocus }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        const newInputValue = e.target.value;
        setInputValue(newInputValue);

        const filteredData = data.filter((item) =>
            Object.values(item).some((value) =>
                typeof value === 'string' && value.toLowerCase().includes(newInputValue.toLowerCase())
            )
        );

        onFilter(filteredData);
    };

    return (
        <Form.Control
            type="text"
            placeholder="Search...                                                    🔍"
            style={{width:'300px',margin:'10px'}}
            onFocus={onFocus}
            value={inputValue}
            onChange={handleInputChange}
        />
    );
};

export default FilterSearch;


// const FilterSearchExample = () => {
//   const [searchValue, setSearchValue] = useState('');
//   const [filteredResults, setFilteredResults] = useState([]);

//   // Sample data (replace with your own array of objects)
//   const allData = [
//     { name: 'Apple', category: 'Fruit' },
//     { name: 'Banana', category: 'Fruit' },
//     { name: 'Cherry', category: 'Fruit' },
//     { name: 'Carrot', category: 'Vegetable' },
//     // ...more objects
//   ];

//   const handleFilter = (filteredData) => {
//     setFilteredResults(filteredData);
//   };

//   return (
//     <div>
//       <h2>Filter/Search Example</h2>
//       <FilterSearch data={allData} onFilter={handleFilter} />

//       <ul>
//         {filteredResults.map((result, index) => (
//           <li key={index}>{result.name} ({result.category})</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FilterSearchExample;
