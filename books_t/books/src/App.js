import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '#MainPage';
import Header from '#Header';
import Footer from '#Footer';
import DetailedPage from '#DetailedPage'
import NotFoundPage from '#NotFoundPage';
import { ThemeProvider } from '#ThemeProvider';


function App() {
  return (
     <ThemeProvider>
      <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<MainPage />}/>
            <Route path="/book/:id" element={<DetailedPage />} />
            <Route path="/not_found" element={<NotFoundPage />}/>
          </Routes>
        <Footer />
        </BrowserRouter>
     </ThemeProvider>
  )
}

export default App;
