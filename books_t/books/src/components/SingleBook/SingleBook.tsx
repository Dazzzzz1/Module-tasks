import './SingleBook.scss'

interface SingleBookInt {
  image: string;
  category: string;
  title: string;
  subtitle: string;
  author: string;
}

function SingleBook({image,category,title,subtitle,author}:SingleBookInt) {
    return ( <>
    <div className="book_cont">
        <div className="book_img_cont">
            <img className="book_img" src={image} alt="book" />
        </div>
        <div className="book_text_cont">
            <div className="book_category">{category}</div>
            <div className="book_title">{title}</div>
            <div className="book_subtitle">{subtitle}</div>
            <div className="book_author">{author}</div>
        </div>
    </div>
    </> );
}

export default SingleBook;