import './LoadMore.scss'

interface LoadMoreInt {
  onClick: () => void; 
}

function LoadMore({onClick}: LoadMoreInt) {
    return ( 
    <div className="show_more_cont">
        <button onClick={onClick} className="show_more">Show More</button>
    </div>
    );
}

export default LoadMore;