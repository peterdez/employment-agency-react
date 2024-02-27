import React from "react";
import { useRef } from "react";

export default function AddCandidateForm({formData, onFormSubmit, onInputChange, onRemoveSkill, onAddSkill}) {
    const skillRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    return(
        <form class="add-form reg-form" onSubmit={( e) => onFormSubmit(firstNameRef, lastNameRef, e)}>
            <label className="form-label">First name</label>
            <input type="text" className="form-control" ref={firstNameRef} name="firstName" onChange={onInputChange} />
            <label className="form-label">Last name</label>
            <input type="text" className="form-control" ref={lastNameRef} name="lastName" onChange={onInputChange} />
            <label className="form-label">Add Skill</label>
            <input type="text" className="form-control" name="skill" ref={skillRef} onChange={onInputChange} />
            <p className="fs-6 text-body-secondary">Type skill and hit add skill button</p>
            <ul>
                {formData.skills && formData.skills.map((skill, i) => <li key={i} className="addskill-li">{skill}
                <button onClick={(e) => onRemoveSkill(skill, e)}><i className="fa fa-close"></i></button>
                </li>)}
            </ul>
            <button className="btn btn-light" onClick={(e) => onAddSkill(skillRef, e)}>Add Skill</button>
            <div className="my-2"><button className="btn btn-primary" type="submit">Submit</button></div>
        </form>
    );
}