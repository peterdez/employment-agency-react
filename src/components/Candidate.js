import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

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

export default function Candidate() {
    const navigate = useNavigate();
    const listArr = [
        {linkTo: "/", text: "Home"},
        {linkTo: "/registration", text: "Registration"},
        {linkTo: "/list", text: "List"}
    ]
    const [candidates, setCandidates] = useState(() => {
        const savedCandidates = localStorage.getItem("candidates");
        return savedCandidates ? JSON.parse(savedCandidates) :  [];
    })
    const {id} = useParams();
    const currentCandidate = candidates.find((candidate) => candidate.id == id)
    /*useEffect(() => {
        const savedCandidates = localStorage.getItem("candidates");
        setCandidates(JSON.parse(savedCandidates));
        console.log(candidates);
    }, []);*/
    const handleDeleteCandidate = (e) => {
        e.preventDefault();
        const removeItem = candidates.filter((candidate) => {
            return candidate.id !== currentCandidate.id
          });
          //setCandidates(removeItem);
          localStorage.setItem("candidates", JSON.stringify(removeItem));
          return navigate("/list")
          
    }
    return (
        <>
        <h4 className="center mt-4">Candidate Details</h4>
        <h2>{currentCandidate.firstName + " " + currentCandidate.lastName}</h2>
        <ul>
        {currentCandidate.skills && currentCandidate.skills.map((skill, j) => <li key={j}>{skill}</li>)}
        </ul>
        <Link to={`/candidate/${currentCandidate.id}/edit`}>Edit</Link>
        <button onClick={handleDeleteCandidate}>Delete</button>
        </>
    );
}