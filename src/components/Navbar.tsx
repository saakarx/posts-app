import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthData } from '../context/AuthContext';
import { signOut } from '../utils/authentication';

const Navbar: React.FC = () => {
  const user = useAuthData();

  return (
    <nav className="navbar">
      <h1>Posts</h1>

      <div className="d-flex align-items-center gap-3 flex-wrap">
        <p className="mb-0 fw-bold">
          {user !== null && user.photoURL && (
            <img
              className="user-avatar"
              src={user.photoURL}
              draggable="false"
            />
          )}
          {user !== null ? user.email : 'Hello Visitor'}
        </p>
        {user !== null ? (
          <button onClick={() => signOut()} className="btn logout-btn">
            🚨 Sign out
          </button>
        ) : (
          <Link to="/signin" className="nav-link link">
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
