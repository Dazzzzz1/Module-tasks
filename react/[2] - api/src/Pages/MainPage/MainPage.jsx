
import {useState} from 'react';
function MainPage() {

  const [dogImage, setDogImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDogImage = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setDogImage(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
    return ( 
     <div>
        <h1>Dog Image</h1>
        <button onClick={fetchDogImage} disabled={loading}>
            {loading ? 'Loading...' : 'Get a Dog'}
        </button>
        
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        
        {dogImage && !loading && (
            <div style={{ marginTop: '20px' }}>
            <img src={dogImage} alt="dog"/>
            </div>
        )}
    </div>
     );
}

export default MainPage;