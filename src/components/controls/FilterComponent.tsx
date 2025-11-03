
import React from 'react';
import { CATEGORIES } from '../../types/product';

interface FilterComponentProps {
  categoryFilter: string;
  minPrice: number;
  maxPrice: number;
  onCategoryChange: (category: string) => void;
  onMinPriceChange: (price: number) => void;
  onMaxPriceChange: (price: number) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ 
  categoryFilter, minPrice, maxPrice, 
  onCategoryChange, onMinPriceChange, onMaxPriceChange 
}) => {

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      
      <select value={categoryFilter} onChange={(e) => onCategoryChange(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
        <option value="Tất cả">Tất cả Danh mục</option>
        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>

      <input
        type="number"
        placeholder="Giá tối thiểu"
        value={minPrice || ''}
        onChange={(e) => onMinPriceChange(Number(e.target.value) || 0)}
        style={{ padding: '8px', width: '120px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <input
        type="number"
        placeholder="Giá tối đa"
        value={maxPrice === Infinity ? '' : maxPrice}
        onChange={(e) => onMaxPriceChange(Number(e.target.value) || Infinity)}
        style={{ padding: '8px', width: '120px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
    </div>
  );
};

export default FilterComponent;