import React from "react";
import { Link } from "react-router-dom";

export default function Header({theListArr}) {
    return (
        <header className="mt-4">
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
     <i className="fa fa-home text-primary"></i> 
    {/*<img src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg" alt="Bootstrap" width="30" height="24"/>*/}
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
      {theListArr.map((list, i) => <li key={i} className="nav-item" ><Link to={list.linkTo} className="nav-link">{list.text}</Link></li>)}
      </ul>
    </div>
  </div>
</nav>
{/*<h4 className="center mt-4">{title}</h4>*/}
        {/*<nav>
        <ul style={ulStyle}>
           {theListArr.map((list, i) => <li key={i} style={liStyle}><Link to={list.linkTo} style={liAStyle}>{list.text}</Link></li>)}
        </ul>
    </nav>*/}
        </header>
    );
}