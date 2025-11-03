import React, { useState, useMemo } from 'react';
import { useProductContext } from '../context/ProductContext';
import ProductList from '../components/products/ProductList';
import SearchBar from '../components/controls/SearchBar';
import FilterComponent from '../components/controls/FilterComponent';
import Pagination from '../components/controls/Pagination';

const ITEMS_PER_PAGE = 6;

const HomePage: React.FC = () => {
  const { state } = useProductContext();
  const allProducts = state.products;

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('Tất cả');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(Infinity);
  const [currentPage, setCurrentPage] = useState(1);
  
  const resetPageIfChanged = (newFilterValue: any) => {
    if (currentPage !== 1) {
        setCurrentPage(1);
    }
    return newFilterValue;
  }

  const filteredAndSearchedProducts = useMemo(() => {
    let result = allProducts;
    
    if (searchTerm) {
      result = result.filter(p => 
        p.ten.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (categoryFilter !== 'Tất cả') {
      result = result.filter(p => p.danhMuc === categoryFilter);
    }
    
    result = result.filter(p => 
        p.gia >= minPrice && 
        p.gia <= (maxPrice === 0 ? Infinity : maxPrice)
    );
    
    return result;
  }, [allProducts, searchTerm, categoryFilter, minPrice, maxPrice]);

  const totalPages = Math.ceil(filteredAndSearchedProducts.length / ITEMS_PER_PAGE);
  
  const productsToShow = useMemo(() => {
    if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(totalPages);
    }

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredAndSearchedProducts.slice(startIndex, endIndex);
  }, [filteredAndSearchedProducts, currentPage, totalPages]);

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  return (
    <div>
      <h2>Danh Sách Sản Phẩm</h2>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', padding: '15px', border: '1px solid #eee', borderRadius: '4px', alignItems: 'center' }}>
      
        <SearchBar 
            searchTerm={searchTerm} 
            onSearchChange={(term) => setSearchTerm(resetPageIfChanged(term))} 
        />

        <FilterComponent 
            categoryFilter={categoryFilter}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onCategoryChange={(cat) => setCategoryFilter(resetPageIfChanged(cat))}
            onMinPriceChange={(price) => setMinPrice(resetPageIfChanged(price))}
            onMaxPriceChange={(price) => setMaxPrice(resetPageIfChanged(price))}
        />
      </div>

      <ProductList products={productsToShow} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredAndSearchedProducts.length}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default HomePage;