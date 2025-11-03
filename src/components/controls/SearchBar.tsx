
import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <input
      type="text"
      placeholder="Tìm kiếm theo tên sản phẩm..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      style={{ padding: '8px', flexGrow: 1, borderRadius: '4px', border: '1px solid #ccc' }}
    />
  );
};

export default SearchBar;