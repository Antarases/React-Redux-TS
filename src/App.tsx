import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import TodosPage from "./pages/todos-page";
import PostsPage from "./pages/posts-page";
import CounterPage from "./pages/counter-page";
import CounterWithTestsPage from "./pages/counter-with-tests-page";

import './App.css';

function App() {
  return (
    <div className="App">

        <BrowserRouter>
            <nav>
                <Link to="/">Todos</Link> | {" "}
                <Link to="/posts">Posts</Link> | {" "}
                <Link to="/counter">Counter</Link> | {" "}
                <Link to="/counter_with_tests">Counter with Tests</Link>
            </nav>

            <Routes>
                <Route path="/" element={<TodosPage/>} />
                <Route path="/posts" element={<PostsPage/>} />
                <Route path="/counter" element={<CounterPage/>} />
                <Route path="/counter_with_tests" element={<CounterWithTestsPage/>} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
