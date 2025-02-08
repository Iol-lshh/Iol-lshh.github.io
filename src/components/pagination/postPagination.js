import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import './postPagination.css' // postPagination.css 파일 임포트

const PostPagination = ({ postCategories }) => {
  return (
    <nav className="blog-post-nav">
      <div className="categories-container">
        categories: 
        <ul>
          <li className="post-categories">
            {postCategories.map((category, index) => (
              <React.Fragment key={category}>
                <Link to={`/categories/${category}/`}>{category}</Link>
                {index < postCategories.length - 1 && ", "}
              </React.Fragment>
            ))}
          </li>
        </ul>
      </div>
    </nav>
  )
}

PostPagination.propTypes = {
  postCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  previous: PropTypes.shape({
    fields: PropTypes.shape({
      slug: PropTypes.string,
    }),
    frontmatter: PropTypes.shape({
      title: PropTypes.string,
      category: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
  next: PropTypes.shape({
    fields: PropTypes.shape({
      slug: PropTypes.string,
    }),
    frontmatter: PropTypes.shape({
      title: PropTypes.string,
      category: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
}

export default PostPagination