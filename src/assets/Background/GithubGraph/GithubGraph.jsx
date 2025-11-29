import React from "react";
import "./GithubGraph.css";

const GithubGraph = ({ username }) => {
  const graphURL = `https://ghchart.rshah.org/FFAD00/${username}`;

  return (
    <div className="github-graph-container">
      <h3 className="github-graph-title">Days I Code</h3>

      <img
        src={graphURL}
        alt={`${username}'s GitHub Contribution Graph`}
        className="github-graph-img"
      />

      <p className="github-graph-note">
        Active GitHub contributions from {username}
      </p>
    </div>
  );
};

export default GithubGraph;
