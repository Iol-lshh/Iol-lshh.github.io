import React, { useState } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import './sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        group(field: { frontmatter: { category: SELECT } }) {
          fieldValue
        }
      }
    }
  `);

  const categories = data.allMarkdownRemark.group.map(group => group.fieldValue);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menu">
      <button onClick={toggleMenu} className={`hamburger-button ${isOpen ? 'shifted' : ''}`}>
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24">
            <line x1="4" y1="4" x2="20" y2="20" stroke="black" strokeWidth="2" />
            <line x1="20" y1="4" x2="4" y2="20" stroke="black" strokeWidth="2" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24">
            <line x1="4" y1="12" x2="20" y2="12" stroke="black" strokeWidth="2" />
            <line x1="4" y1="6" x2="20" y2="6" stroke="black" strokeWidth="2" />
            <line x1="4" y1="18" x2="20" y2="18" stroke="black" strokeWidth="2" />
          </svg>
        )}
      </button>
      <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul>
          {categories.map(category => (
            <li key={category}>
              <Link to={`/categories/${category}/`}>{category}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={`content ${isOpen ? 'shifted' : ''}`}>
        {/* 여기에 페이지 내용을 추가합니다 */}
      </div>
    </div>
  );
};

export default Sidebar;