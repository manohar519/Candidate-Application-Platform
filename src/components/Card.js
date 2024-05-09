import React, { useState } from "react";
import "./card.css";
import timer from "../components/image.png";
import tick from "../components/tick.png";
import men from "../components/man.png"
import women from "../components/women.png"
import { capitalizeFirstLetter } from "./utils";
export const JobPostingCard = ({
  companyName,
  jobDescription,
  maxJdSalary,
  minJdSalary,
  url,
  jobRole,
  location,
  minExp,
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  
  return (
    <div className="job-card">
      <div className="mini-card">
        <img src={timer} width="15" height="15" />
        Posted 10 days ago
      </div>
      <div
        style={{
          display: "flex",
          alignContent: "flex-start",
          paddingTop: "10px",
        }}
      >
        <img src={url} alt="Cinque Terre" width="30" height="50" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            justifyContent: "flex-start",
          }}
        >
          <small>{companyName}</small>
          <small>{capitalizeFirstLetter(jobRole)}</small>
          <small>{capitalizeFirstLetter(location)}</small>
        </div>
      </div>

      <div className="salary">
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <p>
            Estimated Salary ₹{minJdSalary} -₹{maxJdSalary}LPA{" "}
            <img src={tick} width="15" height="15" />
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <small>About Company:</small>
          <small>About us</small>
        </div>
      </div>

      <div className="description">
        {jobDescription.length > 200 ? (
          <div>
            <p>
              {showFullDescription
                ? jobDescription
                : `${jobDescription.slice(0, 200)}...`}
            </p>
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                color: "blue",
              }}
              onClick={toggleDescription}
            >
              {showFullDescription ? "View Less" : "View Job"}
            </p>
          </div>
        ) : (
          <p>{jobDescription}</p>
        )}
      </div>
      {minExp && (
        <p style={{ display: "flex", justifyContent: "flex-start" }}>
          Minimum Exp {minExp}
        </p>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <button
          style={{
            backgroundColor: "#54EFC3",
            height: "50px",
            borderRadius: "20px",
          }}
        >
         ⚡ Eassy apply
        </button>
        <div
          style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            gap:'10px',
            backgroundColor: "#4943DA",
            height: "50px",
            borderRadius: "20px",
            color: "white",
          }}
        >
           <img style={{ borderRadius:'40px',filter:'blur(1px)'}}src={men} width="20" height="20" /> 
           <img style={{ borderRadius:'40px',filter:'blur(1px)'}}  src={women} width="20" height="20" />
          UnLock referal
        </div>
      </div>
    </div>
  );
};
