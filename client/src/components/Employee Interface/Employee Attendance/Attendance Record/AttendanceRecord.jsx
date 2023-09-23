import React, { useState } from 'react';
import { Form, ListGroup } from 'react-bootstrap';

const Autocomplete = ({ suggestions, onSelect }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);

    // Filter the suggestions based on the input value
    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredSuggestions(filtered);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setFilteredSuggestions([]);
    onSelect(suggestion);
  };

  return (
    <div>
      <Form.Control
        type="text"
        placeholder="Type to search..."
        value={inputValue}
        onChange={handleInputChange}
      />
      {filteredSuggestions.length > 0 && (
        <ListGroup>
          {filteredSuggestions.map((suggestion, index) => (
            <ListGroup.Item
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{ cursor: 'pointer' }}
            >
              {suggestion}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

const AutocompleteExample = () => {
  const suggestions = ['Apple', 'Banana', 'Cherry', 'Date', 'Fig', 'Grape'];

  const handleSelect = (selectedValue) => {
    console.log('Selected:', selectedValue);
  };

  return (
    <div>
      <h2>Autocomplete Example</h2>
      <Autocomplete suggestions={suggestions} onSelect={handleSelect} />
    </div>
  );
};

export default AutocompleteExample;
