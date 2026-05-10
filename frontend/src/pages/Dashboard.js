import "./Dashboard.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Dashboard");

  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [jobs, setJobs] = useState([]);
  const [score, setScore] = useState("--");

  // 🔥 STATIC SKILLS (later backend la replace pannalam)
  const [matchingSkills, setMatchingSkills] = useState([
    "Skill 1",
    "Skill 2",
    "Skill 3",
    "Skill 4",
    "Skill 5",
    "Skill 6"
  ]);

  const [missingSkills, setMissingSkills] = useState([
    "Skill 1",
    "Skill 2",
    "Skill 3",
    "Skill 4"
  ]);

  const fetchJobs = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/get-jobs/");
      const data = await res.json();

      setJobs(Array.isArray(data) ? data : []);
    } catch {
      setJobs([]);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleAddJob = async () => {
    if (!jobDesc.trim()) {
      alert("Enter job description");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/add-job/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          job_description: jobDesc
        })
      });

      const data = await res.json();

      if (data.message) {
        setJobDesc("");
        fetchJobs();
      }
    } catch {}
  };

  const handleMatch = async () => {

    if (!role.trim()) {
      alert("Enter Role");
      return;
    }

    if (!description.trim()) {
      alert("Enter Description");
      return;
    }

    if (!file) {
      alert("Upload Resume");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/match/", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (data.match_score !== undefined) {
        setScore(data.match_score);

        // 🔥 future: backend la skills return pannina inga set pannalam
      }

    } catch {}
  };

  const renderContent = () => {
    if (activeTab !== "Dashboard") {
      return <h2>{activeTab} Page</h2>;
    }

    return (
      <>
        {/* TOP STATS */}
        <div className="stats-container">
          <div className="stat-card">
            <div className="icon blue">📄</div>
            <div>
              <h3>Applications</h3>
              <h2>0</h2>
              <p>Total Applied</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="icon green">📅</div>
            <div>
              <h3>Interviews</h3>
              <h2>0</h2>
              <p>Total Interviews</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="icon red">❌</div>
            <div>
              <h3>Rejections</h3>
              <h2>0</h2>
              <p>Total Rejections</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="icon purple">⭐</div>
            <div>
              <h3>Shortlists</h3>
              <h2>0</h2>
              <p>Total Shortlists</p>
            </div>
          </div>
        </div>

        {/* MAIN SECTION */}
        <div className="top-section">

          <div className="left-box">
            <label>Role</label>
            <input value={role} onChange={(e) => setRole(e.target.value)} />

            <label>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

            <label>Upload Resume</label>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />

            <button className="match-btn" onClick={handleMatch}>
              Match Score
            </button>
          </div>

          <div className="match-box">
            <h1>Match Score</h1>
            <p>{score === "--" ? "--" : `${score}%`}</p>
          </div>

          <div className="right-box">
            <h3>Add Job</h3>

            <textarea
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
            />

            <button onClick={handleAddJob}>Add Job</button>

            <h4>Job List</h4>

            {jobs.length > 0 ? (
              jobs.map((job) => (
                <p key={job.id}>{job.description}</p>
              ))
            ) : (
              <p>No jobs</p>
            )}
          </div>

        </div>

        {/* 🔥 SKILLS SECTION */}
        <div className="skills-section">

          <div className="skills-box">
            <h3>Matching Skills</h3>
            {matchingSkills.map((skill, index) => (
              <span key={index} className="skill match">{skill}</span>
            ))}
          </div>

          <div className="skills-box">
            <h3>Missing Skills</h3>
            {missingSkills.map((skill, index) => (
              <span key={index} className="skill missing">{skill}</span>
            ))}
          </div>

        </div>
      </>
    );
  };

  return (
    <div className="dashboard-container">

      <div className="sidebar">
        <h2>JobTrack</h2>
        <ul>
          <li onClick={() => setActiveTab("Dashboard")}>Dashboard</li>
          <li onClick={() => setActiveTab("Application pg")}>Applications</li>
          <li onClick={() => setActiveTab("Jobs pg")}>Jobs</li>
          <li onClick={() => setActiveTab("Profile pg")}>Profile</li>
        </ul>

        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="main-content">
        <h2 className="title">{activeTab}</h2>
        {renderContent()}
      </div>

    </div>
  );
}

export default Dashboard;