import './DetailedPage.scss';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Spinner from '#Spinner';
import opened from '#imgs/Book-open.png'

interface BookData {
  id: string;
  thumbnail: string;
  title: string;
  authors: string;
  description: string;
  category: string;
}

interface LocationState {
  bookData?: BookData;
}

function DetailedPage() {
  
  const { id } = useParams();
  const location = useLocation();
  const state = location.state as LocationState;
  const navigate = useNavigate();
  const [book, setBook] = useState<BookData | null>(state?.bookData || null);
  const [isLoading, setIsLoading] = useState(!state?.bookData);
  
  useEffect(() => {
    if (!book) {
      const fetchBookDetails = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes/${id}`
          );
          const json = await response.json();
          
          setBook({
            id: json.id,
            thumbnail: json.volumeInfo.imageLinks?.thumbnail || 'No image',
            title: json.volumeInfo.title || 'No title',
            authors: json.volumeInfo.authors?.join(', ') || 'Unknown author',
            description: json.volumeInfo.description || 'No description',
            category: json.volumeInfo.categories?.[0] || 'Uncategorized'
          });
        } catch (error) {
          console.error("Error fetching book details:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchBookDetails();
    }
  }, [id, book]);

  function truncateToFirstTitle(text :string) {
        if (!text) return '';
        let sentences = text.split(/[.!?]/);
        let firstSentence = sentences[0].trim();
        if(firstSentence.length > 50){
            return firstSentence.substring(0, 50) + '...';        
        }
        return firstSentence + (sentences.length > 1 ? '...' : (firstSentence ? '.' : ''));
    }

  if (isLoading) return Spinner;
  if (!book) return <div className="error">Book not found</div>;

  return (
    <div className="detailed_cont">
      <div className="detailed_left">
        <div className="detailed_left_title">{truncateToFirstTitle(book.title)}</div>
        <div className="detailed_img_cont">
            <img className="detailed_img" src={book.thumbnail} alt={`Cover of ${book.title}`} />
       </div>
      </div>

      <div className="detailed_right">
        <div className="detailed_right_categ">
          <div className="detailed_right_categ_text"> 
            <img src={opened} alt = 'openedbook'></img>
            Category: {book.category}
          </div>
          <div className="detailed_right_author">Author: {book.authors}</div>
        </div>
        <div className="detailed_right_about_cont">
            <div className="detailed_right_about">About This Book</div>
            <div className="detailed_right_about_text">{book.description}</div>
            <button onClick={() => navigate(-1)} className="backBtn">Back</button>
       </div>
      </div>
         
    </div>

  );
}

export default DetailedPage;