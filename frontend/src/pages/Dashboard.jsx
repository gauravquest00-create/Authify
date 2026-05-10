import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import "./auth.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    projects: 12,
    tasks: 28,
    completed: 76
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data);
      } catch {
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    fetchUser();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dash-wrapper">
      <div className="dash-card fade-in">
        
        {/* Header */}
        <div className="dash-header">
          <div className="dash-logo">🚀</div>
          <h2>Dashboard</h2>
        </div>

        {/* Welcome Section */}
        {user && (
          <div className="dash-welcome">
            <div className="dash-avatar">
              {user.name?.charAt(0) || "U"}
            </div>
            <h3>Welcome back, {user.name}!</h3>
            <p>{user.email}</p>
          </div>
        )}

        {/* Stats Grid */}
        <div className="dash-stats">
          <div className="stat-item">
            <div className="stat-icon">📁</div>
            <div className="stat-value">{stats.projects}</div>
            <div className="stat-label">Active Projects</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">✅</div>
            <div className="stat-value">{stats.tasks}</div>
            <div className="stat-label">Pending Tasks</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">🎯</div>
            <div className="stat-value">{stats.completed}%</div>
            <div className="stat-label">Completion Rate</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dash-actions">
          <button className="action-btn">
            <span>➕</span> New Project
          </button>
          <button className="action-btn">
            <span>📝</span> Create Task
          </button>
          <button className="action-btn">
            <span>👥</span> Invite Team
          </button>
        </div>

        {/* Logout Button */}
        <button onClick={logout} className="dash-logout">
          🚪 Logout
        </button>

      </div>
    </div>
  );
}

export default Dashboard;