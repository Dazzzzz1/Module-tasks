import './NotFoundPage.scss'
import cat from '#imgs/cat.png'

function NotFoundPage() {
    return ( <>
    
    <div className="not_found_container">
        <div className="not_found_text">
            <div className="not_found_title">404 - Not Found</div>
            <div className="not_found_subtitle">The page doesn't exist</div>
        </div>
        <img src={cat} alt='cat' className="not_found_img"/>
    </div>
    </> );
}

export default NotFoundPage;