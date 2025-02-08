import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import './postPagination.css' // postPagination.css 파일 임포트

const PostPagination = ({ previous, next }) => {
  const previousCategories = previous?.frontmatter.category ? previous.frontmatter.category.join(' > ') + ` > ` : ``
  const previousTotalTitle = previous?.frontmatter.title ? previousCategories + previous.frontmatter.title : ``

  const nextCategories = next?.frontmatter.category ? next.frontmatter.category.join(' > ') + ` > ` : ``
  const nextTotalTitle = next?.frontmatter.title ? nextCategories + next.frontmatter.title : ``

  return (
    <nav className="blog-post-nav">
      <ul>
        <li>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← {previousTotalTitle}
            </Link>
          )}
        </li>
        <li>
          <Link to="/">목록으로</Link>
        </li>
        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              {nextTotalTitle} →
            </Link>
          )}
        </li>
      </ul>
    </nav>
  )
}

PostPagination.propTypes = {
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