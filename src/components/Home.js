import React from "react";
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

export default function Home() {
    
    return(
        <h4 className="center mt-4">Home</h4>
    );
}