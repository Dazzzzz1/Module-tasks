import { useState, useEffect } from 'react';
import {SearchFilters} from '#SearchFilters';
import {BooksList} from '#BookList';
import LoadMore from '#LoadMore';
import NotFoundPage from '#NotFoundPage';
import Spinner from '#Spinner';
import './MainPage.scss';

interface Book {
  id: string;
  thumbnail: string;
  title: string;
  authors: string;
  description: string;
  category: string;
  publishedDate: string;
}

function MainPage() {
  const [allBooks, setAllBooks] = useState<Book[]>([]); 
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [activeSearch, setActiveSearch] = useState<string | null>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');

    useEffect(() => {
        fetchBooks(1);
    }, []);

    useEffect(() => {
    const sortBooks = (books: Book[]) => {
    const sortedBooks = [...books];
    
    if (sortBy === 'newest') {
      sortedBooks.sort((a, b) => {
        const dateA = new Date(a.publishedDate).getTime();
        const dateB = new Date(b.publishedDate).getTime();
        return dateB - dateA; 
      });
    } else {
      sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    return sortedBooks;
  };

    if (selectedCategory === 'all') {
      setFilteredBooks(sortBooks(allBooks));
    } else {
      const filtered = allBooks.filter(book => 
        book.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredBooks(filtered);
    }
  }, [sortBy, selectedCategory, allBooks]);

  const fetchBooks = async (pageNum: number, searchTerm: string | null = null) => {
    setIsLoading(true);
    try {
      const query = searchTerm !== null ? searchTerm : 'a';
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=30&startIndex=${(pageNum - 1) * 30}&key=AIzaSyDDHndsDZeXSrQbGCywJ3SApXmnB64EO0w&fields=items(id,volumeInfo(title,authors,description,categories,imageLinks/thumbnail,publishedDate))`
      );
      const json = await response.json();
      const formattedData = json.items?.map((item: any) => ({
        id: item.id,
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || 'No image',
        title: item.volumeInfo.title || 'No title',
        authors: item.volumeInfo.authors?.join(', ') || 'Unknown author',
        description: item.volumeInfo.description || 'No description',
        category: item.volumeInfo.categories?.[0] || 'Uncategorized',
        publishedDate: item.volumeInfo.publishedDate || '0000'
      })) || []; 
      setAllBooks(prevBooks => 
        pageNum === 1 ? formattedData : [...prevBooks, ...formattedData] 
      );
      setFilteredBooks(prevBooks => 
        pageNum === 1 ? formattedData : [...prevBooks, ...formattedData] 
      );
    } catch (error) {
      console.error("ERROR!", error);
    } finally {
      setIsLoading(false);
    }
  };
  const loadMoreHandler = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchBooks(nextPage, activeSearch);
  };
  const handleSearch = () => {
    const hasSpecialChars = /[^\w\s]/.test(search);
    setShowWarning(hasSpecialChars);
    
    if (!hasSpecialChars) {
      setActiveSearch(search);
      setPage(1);
      fetchBooks(1, search);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(); 
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  
  return (
    <>
      {(filteredBooks.length > 0 || isLoading) && (
        <div className="main_cont">
          <div className="main_title">The Book Lover's Dreamland Awaits!</div>
          <div className="main_subtitle">
            Welcome to the ultimate book lover's paradise! Join our community and contribute to the ever-evolving library of stories, where every book has a chance to inspire someone new.
          </div>
          <SearchFilters
            search={search}
            onSearch={handleSearch}
            onKeyPress={handleKeyPress}
            onInputChange={handleInputChange}
            showWarning={showWarning}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>
      )}
      
      {filteredBooks.length === 0 && !isLoading ? (
        <NotFoundPage/>
      ) : (
        <div className="loaded_books">Number of books found - {filteredBooks.length}</div>
      )}
      
      <BooksList books={filteredBooks} />
      
      {isLoading ? (
        <Spinner/>
      ) : (
        filteredBooks.length > 0 && activeSearch === null && selectedCategory === 'all' && (
          <LoadMore onClick={loadMoreHandler}/>
        )
      )}
    </>
  );
}

export default MainPage;