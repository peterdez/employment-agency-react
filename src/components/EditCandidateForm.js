import React from "react";
import { useState, useRef } from "react";

export default function EditCandidateForm({candidate, setIsEditing, onEditFormSubmit, onEditInputChange, onRemoveSkillCurrent, onAddSkillCurrent}) {
    const skillRef = useRef();
    return(
        <form class="edit-form reg-form" onSubmit={onEditFormSubmit}>
            <label className="form-label">First name</label>
            <input type="text" className="form-control" name="firstName" value={candidate.firstName} onChange={onEditInputChange} />
            <label className="form-label">Last name</label>
            <input type="text" className="form-control" name="lastName" value={candidate.lastName} onChange={onEditInputChange} />
            <label className="form-label">Add Skill</label>
            <input type="text" className="form-control" ref={skillRef} name="skill" onChange={onEditInputChange} />
            <ul>
                {candidate.skills && candidate.skills.map((skill, i) => <li key={i} className="addskill-li">{skill}
                    <button onClick={(e) => onRemoveSkillCurrent(skill, e)}><i className="fa fa-close"></i></button>
                    </li>)}
            </ul>
            <div className="mb-2">
            <button className="btn btn-light" onClick={(e) => onAddSkillCurrent(skillRef, e)}>Add Skill</button>
            <button className="btn btn-primary" type="submit">Update</button>
            <button className="btn btn-link" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
        </form>
    );
}