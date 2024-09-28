import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './ResumeForm.css'; // Import CSS file
import '@fortawesome/fontawesome-free/css/all.min.css';


const ResumeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    profileSummary: '',
    education: [{ institution: '', degree: '', year: '' }],
    workExperience: [{ company: '', position: '', duration: '' }],
    skills: [''],
    achievements: [''],
  });
  const [resumeId, setResumeId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNestedChange = (index, type, e) => {
    const newItems = [...formData[type]];
    if (type === 'skills' || type === 'achievements') {
      newItems[index] = e.target.value;
    } else {
      newItems[index] = { ...newItems[index], [e.target.name]: e.target.value };
    }
    setFormData({ ...formData, [type]: newItems });
  };

  const handleAddItem = (type) => {
    const newItems = [...formData[type], type === 'skills' || type === 'achievements' ? '' : { institution: '', degree: '', year: '' }];
    setFormData({ ...formData, [type]: newItems });
  };

  const handleDeleteItem = (index, type) => {
    const newItems = [...formData[type]];
    newItems.splice(index, 1);
    setFormData({ ...formData, [type]: newItems });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/resumes', formData)
      .then(response => {
        console.log('Resume submitted:', response.data);
        setResumeId(response.data._id);
      })
      .catch(error => {
        console.error('There was an error submitting the resume:', error);
      });
  };

  const exportToPDF = () => {
    const input = document.getElementById('resume-preview');
    html2canvas(input, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
      pdf.save('resume.pdf');
    }).catch(error => {
      console.error('There was an error generating the PDF:', error);
    });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
        
        {/* Profile Summary Section */}
        <h3>Profile Summary</h3>
        <textarea 
          name="profileSummary" 
          value={formData.profileSummary} 
          onChange={handleChange} 
          placeholder="Write a brief introduction (max 3 lines)"
          rows="3"
          maxLength="300"  // Optional, to limit the number of characters
          style={{ resize: 'none' }}  // Disable resizing
        />

        {/* Education Section */}
        <h3>Education</h3>
        {formData.education.map((item, index) => (
          <div key={index} className="form-group">
            <input type="text" name="institution" value={item.institution} onChange={(e) => handleNestedChange(index, 'education', e)} placeholder="Institution" />
            <input type="text" name="degree" value={item.degree} onChange={(e) => handleNestedChange(index, 'education', e)} placeholder="Degree" />
            <input type="text" name="year" value={item.year} onChange={(e) => handleNestedChange(index, 'education', e)} placeholder="Year" />
            <i 
              className="fas fa-trash delete-icon" 
              onClick={() => handleDeleteItem(index, 'education')} 
              title="Delete"
            ></i>
          </div>
        ))}
        <button type="button" onClick={() => handleAddItem('education')}>Add Education</button>

        {/* Work Experience Section */}
        <h3>Work Experience</h3>
        {formData.workExperience.map((item, index) => (
          <div key={index} className="form-group">
            <input type="text" name="company" value={item.company} onChange={(e) => handleNestedChange(index, 'workExperience', e)} placeholder="Company" />
            <input type="text" name="position" value={item.position} onChange={(e) => handleNestedChange(index, 'workExperience', e)} placeholder="Position" />
            <input type="text" name="duration" value={item.duration} onChange={(e) => handleNestedChange(index, 'workExperience', e)} placeholder="Duration" />
            <i 
              className="fas fa-trash delete-icon" 
              onClick={() => handleDeleteItem(index, 'workExperience')} 
              title="Delete"
            ></i>
          </div>
        ))}
        <button type="button" onClick={() => handleAddItem('workExperience')}>Add Work Experience</button>

        {/* Skills Section */}
        <h3>Skills</h3>
        {formData.skills.map((item, index) => (
          <div key={index} className="form-group">
            <input type="text" name={`skill${index}`} value={item} onChange={(e) => handleNestedChange(index, 'skills', e)} placeholder="Skill" />
            <i 
              className="fas fa-trash delete-icon" 
              onClick={() => handleDeleteItem(index, 'skills')} 
              title="Delete"
            ></i>
          </div>
        ))}
        <button type="button" onClick={() => handleAddItem('skills')}>Add Skill</button>

        {/* Achievements Section */}
        <h3>Achievements</h3>
        {formData.achievements.map((item, index) => (
          <div key={index} className="form-group">
            <input type="text" name={`achievement${index}`} value={item} onChange={(e) => handleNestedChange(index, 'achievements', e)} placeholder="Achievement" />
            <i 
              className="fas fa-trash delete-icon" 
              onClick={() => handleDeleteItem(index, 'achievements')} 
              title="Delete"
            ></i>
          </div>
        ))}
        <button type="button" onClick={() => handleAddItem('achievements')}>Add Achievement</button>

        <button type="submit">Submit</button>
      </form>

      {resumeId && (
        <div>
          <h3>Resume Preview</h3>
          <div id="resume-preview">
            <h1>{formData.name}</h1>
            <p>Email: {formData.email}</p>
            <p>Phone: {formData.phone}</p>
            <p>Address: {formData.address}</p>
            <h3>Profile Summary</h3>
            <p>{formData.profileSummary}</p>
            <h3>Education</h3>
            <ul>
              {formData.education.map((edu, index) => (
                <li key={index}>{edu.institution} - {edu.degree} ({edu.year})</li>
              ))}
            </ul>
            <h3>Work Experience</h3>
            <ul>
              {formData.workExperience.map((work, index) => (
                <li key={index}>{work.company} - {work.position} ({work.duration})</li>
              ))}
            </ul>
            <h3>Skills</h3>
            <ul>
              {formData.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
            <h3>Achievements</h3>
            <ul>
              {formData.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
          <button onClick={exportToPDF}>Export to PDF</button>
        </div>
      )}
    </div>
  );
};

export default ResumeForm;
