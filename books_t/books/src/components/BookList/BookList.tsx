import { useNavigate } from 'react-router-dom';
import SingleBook from '#SingleBook';
import './BookList.scss';

interface Book {
  id: string;
  thumbnail: string;
  title: string;
  authors: string;
  description: string;
  category: string;
}

interface BooksListProps {
  books: Book[];
}

export const BooksList = ({ books }: BooksListProps) => {
  const navigate = useNavigate();

  const truncateToFirstSentence = (text: string): string => {
    if (!text) return '';
    const sentences = text.split(/[.!?]/);
    const firstSentence = sentences[0].trim();
    if (firstSentence.length > 50) {
      return firstSentence.substring(0, 50) + '...';        
    }
    return firstSentence + (sentences.length > 1 ? '...' : (firstSentence ? '.' : ''));
  };

  return (
    <div className="all_books">
      {books.map((item) => (
        <div 
          onClick={() => navigate(`/book/${item.id}`, { state: { bookData: item }})} 
          key={item.id}
        >
          <SingleBook 
            image={item.thumbnail}
            category={truncateToFirstSentence(item.category)}
            title={truncateToFirstSentence(item.title)}
            subtitle={truncateToFirstSentence(item.description)}
            author={item.authors}
          />
        </div>
      ))}
    </div>
  );
};