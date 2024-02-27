import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";
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
export default function Registration() {
    const [candidates, setCandidates] = useState(() => {
        const savedCandidates = localStorage.getItem("candidates");
        return savedCandidates ? JSON.parse(savedCandidates) :  [];
    })
    const initialFormData = {
      firstName: "",
        lastName: "",
        skill: "",
        skills: [],
    }
    const [formData, setFormData] = useState(initialFormData)
    const [isSubmitted, setIsubmitted] = useState(false);
    
    const [isEditing, setIsEditing] = useState(false);
    const [currentCandidate, setCurrentCandidate] = useState({});
    //const firstNamRef = useRef();
    useEffect(() => {
      localStorage.setItem("candidates", JSON.stringify(candidates) )
    }, [candidates])
    const handleInputChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setFormData(values => ({...values, [name]: value}));
    }
    const handleFormSubmit = (firstNameRef,lastNameRef, e) => {
       e.preventDefault();
       if (firstNameRef.current.value === "") {
            return false;
       }
        //formData.firstName
        firstNameRef.current.value !== "" && setCandidates([...candidates, 
        {
         id: candidates.length + 1,
         firstName: formData.firstName, 
         lastName: formData.lastName,
         skills: formData.skills,   
        }])
        firstNameRef.current.value = "";
        lastNameRef.current.value = "";
        setFormData(initialFormData);
        setIsubmitted(true);
       /*localStorage.setItem()
       setFormData({});
       console.log(formData);*/
    }
    const handleDeleteCandidate = (id) => {
      const removeItem = candidates.filter((candidate) => {
        return candidate.id !== id
      });
      setCandidates(removeItem);
    }
    const handleAddSkill = (skillRef, e) => {
        e.preventDefault();
        const addedSkills = formData.skills.map((skill) => skill.toLowerCase())
        if(skillRef.current.value === "" || addedSkills.includes(skillRef.current.value.toLowerCase())){
            return false;
           }
        setFormData({...formData, skills: formData.skills.concat(formData.skill)});
        //setFormData({...formData, skill: ""});
        //console.log(formData.skills);
        skillRef.current.value = "";
        //skillRef.current.focus();
    }
    const handleRemoveSkill = (skill, e) => {
        e.preventDefault();
        setFormData(values => ({...values, skills: formData.skills.filter((candidateSkill) => 
            candidateSkill.toLowerCase() !== skill.toLowerCase())}));
            console.log(currentCandidate.skills);
    }
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
    const handleEditCandidateClick = (candidate) => {
      setIsubmitted(false);
      setIsEditing(true);
      setCurrentCandidate({...candidate});
      console.log(candidate);
    }
    const handleUpdatedCandidate = (id, updatedCandidate) => {
       const updatedItem = candidates.map((candidate) => {
        return candidate.id === id ? updatedCandidate : candidate;
       });
       setIsEditing(false);
       setCandidates(updatedItem);
       setIsubmitted(true);
    }
    const handleEditFormSubmit = (e) => {
    e.preventDefault();
    handleUpdatedCandidate(currentCandidate.id, currentCandidate)
    }
    //const skillRef = useRef();
    const keyDownHandler = event => {
          if (event.key === 'Enter') {
            event.preventDefault();
          }
        };
    
    document.addEventListener('keydown', keyDownHandler);
      
    return(
        <>
        <h4 className="center mt-4">Candidate Registration</h4>
        {isSubmitted ? <div style={{textAlign: "center"}}><button className="btn btn-primary mb-2" onClick={() => setIsubmitted(false)}>Add Candidate</button></div> : isEditing ? (
           <EditCandidateForm candidate={currentCandidate}
            onEditFormSubmit={handleEditFormSubmit}
             onEditInputChange={handleEditInputChange}
              onRemoveSkillCurrent={handleRemoveSkillCurrent} onAddSkillCurrent={handleAddSkillCurrent}
              setIsEditing={setIsEditing} /> 
        )
        : (
            <AddCandidateForm onFormSubmit={handleFormSubmit}
            formData={formData}
             onInputChange={handleInputChange} 
             onRemoveSkill={handleRemoveSkill}
             onAddSkill={handleAddSkill}
             />
        )}
        {!isEditing && <div className="reg-list-div">
        <div className="row row-cols-1 row-cols-md-3 g-4">
                {candidates && candidates.map((candidate) => {
                return <CandidateItem candidate={candidate} onEditClick={handleEditCandidateClick} onDeleteClick={handleDeleteCandidate} />
                })}
            </div>
        </div>}
     </>   
    );
}