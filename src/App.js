import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Registration from './components/Registration';
import AddCandidateForm from './components/AddCandidateForm';
import EditCandidateFormB from './components/EditCandidateFormB';
import Candidate from './components/Candidate';
import List from './components/List';
import ListB from './components/ListB';
import Header from './components/Header';
import logo from './logo.svg';
import './App.css';

const ulStyle = {
  listStyleType: "none",
  margin: "0",
  padding: "0",
  overflow: "hidden",
  backgroundColor: "#333",
}

const liStyle = {
  float: "left",
}

const liAStyle = {
  display: "block",
color: "white",
textAlign: "center",
padding: "14px 16px",
textDecoration: "none",
}

function App() {
  const listArr = [
    {linkTo: "/home", text: "Home"},
    {linkTo: "/registration", text: "Registration"},
    {linkTo: "/list", text: "List"},
    {linkTo: "/list-search", text: "List Search"},
]
  return (
  <BrowserRouter>
  <div className="container mb-4">
  <Header theListArr={listArr} />
  {/*<Header theListArr={listArr} ulStyle={ulStyle} liStyle={liStyle} liAStyle={liAStyle} />*/}
  <Routes>
    <Route path="/" element={<Registration />}/>
    <Route path="/home" element={<Home />}/>
    <Route path="/registration" element={<Registration/>}/>
    <Route path="/candidate/:id" element={<Candidate/>}/>
    <Route path="/candidate/:id/edit" element={<EditCandidateFormB/>}/>
    <Route path="/list" element={<List />}/>
    <Route path="/list-search" element={<ListB />}/>
  </Routes>
  </div>
  </BrowserRouter>
  );
}

export default App;
