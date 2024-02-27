import React from "react";
import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

export default function EditCandidateFormB() {
    const navigate = useNavigate();
    const listArr = [
        {linkTo: "/", text: "Home"},
        {linkTo: "/registration", text: "Registration"},
        {linkTo: "/list", text: "List"}
    ]
    const [candidates, setCandidates] = useState(() => {
        const savedCandidates = localStorage.getItem("candidates");
        return savedCandidates ? JSON.parse(savedCandidates) :  [];
    });
    const {id} = useParams();
    const [currentCandidate, setCurrentCandidate] = useState(() => {
        const thecurrentCandidate = candidates.find((candidate) => candidate.id == id);
        return thecurrentCandidate ? thecurrentCandidate : {}
    });
    const skillRef = useRef();
    //const currentCandidate = candidates.find((candidate) => candidate.id == id)
    const handleEditInputChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setCurrentCandidate(values => ({...values, [name]: value}));
      console.log(currentCandidate);
    }
    const handleAddSkillCurrent = (skillRef, e) => {
        e.preventDefault();
        const currentSkills = currentCandidate.skills.map((skill) => skill.toLowerCase())
        if(skillRef.current.value === "" || currentSkills.includes(currentCandidate.skill.toLowerCase())) {
          return false;
        }
        setCurrentCandidate(values => ({...values, skills: currentCandidate.skills.concat(currentCandidate.skill)}));
        skillRef.current.value = "";
        console.log(currentCandidate.skills);
    }
    const handleRemoveSkillCurrent = (skill, e) => {
        e.preventDefault();
        setCurrentCandidate(values => ({...values, skills: currentCandidate.skills.filter((candidateSkill) => 
            candidateSkill.toLowerCase() !== skill.toLowerCase())}));
            console.log(currentCandidate.skills);
    }
    /*const handleEditCandidateClick = (candidate) => {
      //setIsEditing(true);
      setCurrentCandidate({...candidate});
      console.log(candidate);
    }*/
    const handleUpdatedCandidate = (id, updatedCandidate) => {
       const updatedItem = candidates.map((candidate) => {
        return candidate.id === id ? updatedCandidate : candidate;
       });
       //setIsEditing(false);
       localStorage.setItem("candidates", JSON.stringify(updatedItem));
       return navigate("/list")
       //setCandidates(updatedItem);
    }
    const handleEditFormSubmit = (e) => {
    e.preventDefault();
    handleUpdatedCandidate(currentCandidate.id, currentCandidate)
    }
    return(
        <>
        <h4 className="center mt-4">Edit Candidate</h4>
        <form class="edit-form reg-form" onSubmit={handleEditFormSubmit}>
            <label className="form-label">First name</label>
            <input type="text" className="form-control" name="firstName" value={currentCandidate.firstName} onChange={handleEditInputChange} />
            <label className="form-label">Last name</label>
            <input type="text" className="form-control" name="lastName" value={currentCandidate.lastName} onChange={handleEditInputChange} />
            <label className="form-label">Add Skill</label>
            <input type="text" className="form-control" ref={skillRef} name="skill" onChange={handleEditInputChange} />
            <ul>
                {currentCandidate.skills && currentCandidate.skills.map((skill, i) => <li key={i} className="addskill-li">{skill}
                    <button onClick={(e) => handleRemoveSkillCurrent(skill, e)}><i className="fa fa-close"></i></button>
                    </li>)}
            </ul>
            <button className="btn btn-light" onClick={(e) => handleAddSkillCurrent(skillRef, e)}>Add Skill</button>
            <button className="btn btn-primary" type="submit">Update</button>
            {/*<button onClick={() => setIsEditing(false)}>Cancel</button>*/}
        </form>
        </>
    );
}