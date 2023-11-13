import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

// const Filter = ({ data, onFilter, attribute }) => {
//     const [inputValue, setInputValue] = useState('');

//     const handleInputChange = (e) => {
//         const newInputValue = e.target.value;
//         setInputValue(newInputValue);

//         const filteredData = data.filter((item) =>
//             Object.values(item).some((value) =>
//                 typeof value === 'string' &&
//                 (attribute ? value.toLowerCase().includes(newInputValue.toLowerCase()) : false)
//             )
//         );

//         onFilter(filteredData);
//     };

//     return (
//         <Form.Control
//             type="text"
//             placeholder="Search..."
//             value={inputValue}
//             onChange={handleInputChange}
//         />
//     );
// };

const Filter = ({ data, onFilter, attribute, ...rest }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        const newInputValue = e.target.value;
        setInputValue(newInputValue);

        const filteredData = data.filter((item) =>
            Object.values(item).some((value) =>
                typeof value === 'string' &&
                (attribute ? value.toLowerCase().includes(newInputValue.toLowerCase()) : false)
            )
        );

        onFilter(filteredData);
    };

    return (
        <Form.Control
            type="text"
            placeholder="Search...                                                      🔍︎"
            value={inputValue}
            onChange={handleInputChange}
            {...rest}
        />
    );
};


export default Filter;



