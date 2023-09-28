import React, { useState } from 'react';
import { Form, ListGroup } from 'react-bootstrap';
const Autocomplete = ({ suggestions, value, onChange }) => {
  const [inputValue, setInputValue] = useState(value || '');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const newInputValue = e.target.value;
    setInputValue(newInputValue);

    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(newInputValue.toLowerCase())
    );

    setFilteredSuggestions(filtered);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setFilteredSuggestions([]);
    onChange(suggestion);
  };

  return (
    <div>
      <Form.Control
        type="text"
        placeholder="Select or type to search..."
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

export default Autocomplete;
