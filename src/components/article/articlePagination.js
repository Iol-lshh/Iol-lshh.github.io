import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './articlePagination.css' // CSS 파일을 임포트

const ArticlePagination = ({ posts, postsPerPage, setCurrentPosts }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(posts.length / postsPerPage)

  useEffect(() => {
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    setCurrentPosts(posts.slice(indexOfFirstPost, indexOfLastPost))
  }, [currentPage, posts, postsPerPage, setCurrentPosts])

  useEffect(() => {
    setCurrentPage(1)
  }, [posts])

  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => setCurrentPage(i + 1)}
          disabled={currentPage === i + 1}
          className="pagination-button"
        >
          {i + 1}
        </button>
      ))}
    </div>
  )
}

ArticlePagination.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        excerpt: PropTypes.string,
        fields: PropTypes.shape({
          slug: PropTypes.string,
        }),
        frontmatter: PropTypes.shape({
          date: PropTypes.string,
          title: PropTypes.string,
          category: PropTypes.arrayOf(PropTypes.string),
          description: PropTypes.string,
        }),
      }),
    })
  ).isRequired,
  postsPerPage: PropTypes.number.isRequired,
  setCurrentPosts: PropTypes.func.isRequired,
}

export default ArticlePagination