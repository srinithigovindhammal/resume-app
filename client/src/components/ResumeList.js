import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResumeList = () => {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/resumes')
      .then(response => {
        setResumes(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the resumes:', error);
      });
  }, []);

  return (
    <div>
      <h2>Resumes</h2>
      <ul>
        {resumes.map((resume, index) => (
          <li key={index}>
            <h3>{resume.name}</h3>
            <p>Email: {resume.email}</p>
            <p>Phone: {resume.phone}</p>
            <p>Address: {resume.address}</p>
            <h4>Education:</h4>
            <ul>
              {resume.education.map((edu, eduIndex) => (
                <li key={eduIndex}>{edu.institution} - {edu.degree} ({edu.year})</li>
              ))}
            </ul>
            <h4>Work Experience:</h4>
            <ul>
              {resume.workExperience.map((work, workIndex) => (
                <li key={workIndex}>{work.company} - {work.position} ({work.duration})</li>
              ))}
            </ul>
            <h4>Skills:</h4>
            <ul>
              {resume.skills.map((skill, skillIndex) => (
                <li key={skillIndex}>{skill}</li>
              ))}
            </ul>
            <h4>Achievements:</h4>
            <ul>
              {resume.achievements.map((achievement, achievementIndex) => (
                <li key={achievementIndex}>{achievement}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResumeList;
