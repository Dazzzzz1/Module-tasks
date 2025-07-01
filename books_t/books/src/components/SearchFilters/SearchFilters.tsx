import { useState, KeyboardEvent, ChangeEvent } from 'react';
import chevrone from '#imgs/chevrone.png';
import './SearchFilters.scss';

interface SearchFiltersProps {
  search: string;
  onSearch: () => void;
  onKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  showWarning: boolean;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

const categories = ['all', 'art', 'biography', 'computers', 'history', 'medical', 'poetry'];
const sortOptions = ['relevance', 'newest'];

export const SearchFilters = ({
  search,
  onSearch,
  onKeyPress,
  onInputChange,
  showWarning,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
}: SearchFiltersProps) => {
  const [showCategories, setShowCategories] = useState(false);
  const [showSort, setShowSort] = useState(false);

  return (
    <div className="search_cont">
      <div className="search_name">
        <input 
          onChange={onInputChange} 
          onKeyDown={onKeyPress} 
          value={search} 
          className="search_inp" 
          type="text" 
          placeholder='Search a Book' 
        />
        <button onClick={onSearch} className="search_btn">Search</button>
      </div>
      {showWarning && (
        <div className="wrongInp">You cannot enter special characters</div>
      )}
      <div className="search_subcont">
        <div className="search_wrapper">
          <div className="search_placeholder" onClick={() => setShowCategories(!showCategories)}>
            Categories
          </div>
          <div className="search_sort" onClick={() => setShowCategories(!showCategories)}>
            <div className="search_sort_title">
              {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
            </div>
            <img className="search_sort_chevrone" src={chevrone} alt="chevrone" />
          </div>
          {showCategories && (
            <div className="filter">
              {categories.map(category => (
                <div 
                  key={category}
                  className={`filter_value ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowCategories(false);
                  }}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="search_wrapper">
          <div className="search_placeholder" onClick={() => setShowSort(!showSort)}>
            Sorting by
          </div>
          <div className="search_sort" onClick={() => setShowSort(!showSort)}>
            <div className="search_sort_title">
              {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
            </div>
            <img className="search_sort_chevrone" src={chevrone} alt="chevrone" />
          </div>
          {showSort && (
            <div className="filter">
              {sortOptions.map(option => (
                <div 
                  key={option}
                  className={`filter_value ${sortBy === option ? 'active' : ''}`}
                  onClick={() => {
                    setSortBy(option);
                    setShowSort(false);
                  }}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};