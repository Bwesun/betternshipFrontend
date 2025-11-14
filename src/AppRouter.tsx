import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ViewNotes from './pages/ViewNotes';
import AddNote from './pages/AddNote';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/notes" Component={ViewNotes}/>
        <Route path="/" Component={ViewNotes} />
        <Route path="/add" Component={AddNote} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter