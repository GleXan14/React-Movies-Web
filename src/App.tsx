
import './App.scss';
import Home from './components/HomeComponent/HomeComponent';
import GlobalNavbar from './components/NavbarComponent/NavbarComponent';
import Footer from './components/FooterComponent/FooterComponent';
import Movies from './components/MoviesComponent/MoviesComponent';
import MovieDetails from './components/MovieDetailsComponent/MovieDetailsComponent';
import { Outlet, Route, Routes, Navigate } from 'react-router-dom';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='movies' element={<Movies />} />
        <Route path='movie/:id' element={<MovieDetails />} />
      </Route>
      <Route path='*' element={<Navigate to="/" replace={true} />} />
    </Routes>
  );
}

function Layout(){
  return(
    <div>
      <header>
        <GlobalNavbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App;
