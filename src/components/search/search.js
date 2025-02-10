import React, { useState } from "react";
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from "gatsby";
import "./search.css"; // search.css 파일 임포트

const Search = ({ onSearch, category }) => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
        edges {
          node {
            id
            frontmatter {
              title
              date(formatString: "MMMM DD, YYYY")
              category
              description
            }
            fields {
              slug
            }
            excerpt
          }
        }
      }
    }
  `);

  const [query, setQuery] = useState("");
  const posts = data.allMarkdownRemark.edges;

  const handleSearch = () => {
    const filteredPosts = posts.filter(({ node }) => {
      const matchesTitle = node.frontmatter.title.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category ? node.frontmatter.category.includes(category) : true;
      return matchesTitle && matchesCategory;
    });
    onSearch(filteredPosts);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="검색어를 입력하세요..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={handleKeyPress} // 엔터 키 이벤트 핸들러 추가
      />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
};

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  category: PropTypes.string,
};

export default Search;