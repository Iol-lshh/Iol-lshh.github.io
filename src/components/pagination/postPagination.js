import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import './postPagination.css' // postPagination.css 파일 임포트

const PostPagination = ({ postCategories, previous, next }) => {
  const previousCategories = previous?.frontmatter.category ? previous.frontmatter.category.join(' > ') + ` > ` : ``
  const previousTotalTitle = previous?.frontmatter.title ? previousCategories + previous.frontmatter.title : ``

  const nextCategories = next?.frontmatter.category ? next.frontmatter.category.join(' > ') + ` > ` : ``
  const nextTotalTitle = next?.frontmatter.title ? nextCategories + next.frontmatter.title : ``

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