import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminRouter } from './routes/admin';
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import { UserRouter } from './routes/user';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin">
          {AdminRouter.map((r: any) => (
            <Route {...r.routeProps} element={<r.component />} />
          ))}
        </Route>
        <Route path="/">
          {UserRouter.map((r: any) => (
            <Route {...r.routeProps} element={<r.component />} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
