import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import CandidateItem from "./CandidateItem";
import AddCandidateForm from "./AddCandidateForm";
import EditCandidateForm from "./EditCandidateForm";

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

export default function List() {
    const [candidates, setCandidates] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchCandidates, setSearchCandidates] = useState([]);
    const [isSearched, setIsSearched] = useState(false)
    
    useEffect(() => {
        const savedCandidates = localStorage.getItem("candidates");
        if(savedCandidates){
            setCandidates(JSON.parse(savedCandidates));
        }
      }, []);
      const onChangeSearchTitle = e => {
          setSearchTitle(e.target.value);
          console.log(searchTitle);
      }
      const findByTitle = e => {
        const searchedCandidate = candidates.filter((candidate) => candidate.firstName.toLowerCase().substring(0, searchTitle.length) === searchTitle.trim().toLowerCase());
        setSearchCandidates(searchedCandidate);
        setIsSearched(true);
      }
      const handleDeleteCandidate = (id) => {
        const removeItem = candidates.filter((candidate) => {
          return candidate.id !== id
        });
        localStorage.setItem("candidates", JSON.stringify(removeItem));
        setCandidates(removeItem);
        //return navigate("/list")
        //setCandidates(removeItem);
      }
      console.log(candidates);
    return(
        <>
        <h4 className="center mt-4">Candidate List</h4>
        <div className="mb-3">
        <input type="text" className="form-control" placeholder="Search" value={searchTitle} onChange={onChangeSearchTitle} onKeyUp={findByTitle}/>
        {/*<button onClick={findByTitle}>Search</button>*/}
        </div>
        <table className="table table-bordered">
        <thead> 
        <tr>
        <th scope="col">Name</th>
        <th scope="col">Skills</th>
        <th scope="col"></th>
        </tr>
        </thead> 
        <tbody>
        {
        searchTitle.length > 0 && isSearched  ? searchCandidates.map((candidate) => <tr key={candidate.id} className="searchtr">
        <td><Link to={`/candidate/${candidate.id}`}>{candidate.firstName}</Link></td>
        <td>{candidate.skills.map((skill, i) => 
        i === candidate.skills.length - 1 ? <span>{skill}</span> : <span>{skill + ", "}</span>
        )}</td>
        <td>
        <div className="btn-group" role="group" aria-label="List Actions">
        <Link className="btn btn-light" to={`/candidate/${candidate.id}`}>View</Link>
        <Link className="btn btn-light" to={`/candidate/${candidate.id}/edit`}>Edit</Link>
        <button className="btn btn-dark" onClick={(e) => handleDeleteCandidate(candidate.id)}>Delete</button>
        </div>
        </td>
    </tr>) : candidates.map((candidate) => <tr key={candidate.id} className="maintr">
                <td><Link to={`/candidate/${candidate.id}`}>{candidate.firstName}</Link></td>
                <td>{candidate.skills.map((skill, i) => 
                i === candidate.skills.length - 1 ? <span>{skill}</span> : <span>{skill + ", "}</span>
                )}</td>
                <td>
                <div className="btn-group" role="group" aria-label="List Actions">
                <Link className="btn btn-light" to={`/candidate/${candidate.id}`}>View</Link>
                <Link className="btn btn-light" to={`/candidate/${candidate.id}/edit`}>Edit</Link>
                <button className="btn btn-dark" onClick={(e) => handleDeleteCandidate(candidate.id)}>Delete</button>
                </div>
                </td>
            </tr>)}
            </tbody>   
        </table>
        </>
    );
}