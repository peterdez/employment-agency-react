import React from "react";

export default function CandidateItem({candidate, onEditClick, onDeleteClick}) {
    return (
        <div key={candidate.id} className="col">
        <div className="card">
        <img src="https://i.insider.com/5f6096fc57b7da001ee11943" class="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{candidate.firstName + ' ' + candidate.lastName}</h5>
            <p className="card-text">
                       
                        {candidate.skills && candidate.skills.map((skill, j) => <span key={j}>{skill + " "}</span>)}
                       
            </p>
            <button className="btn btn-light btn-sm" onClick={() => onEditClick(candidate)}>Edit</button>
            <button className="btn btn-dark btn-sm" onClick={() => onDeleteClick(candidate.id)}>Delete</button>
          </div>
        </div>
      </div>
    /*<li key={candidate.id}>{candidate.firstName + ' ' + candidate.lastName}
                       <ul>
                        {candidate.skills && candidate.skills.map((skill, j) => <li key={j}>{skill}</li>)}
                       </ul>
                       <button onClick={() => onEditClick(candidate)}>Edit</button>
                       <button onClick={() => onDeleteClick(candidate.id)}>Delete</button>
    </li>*/);
}