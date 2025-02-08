import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

const BlogPostPreview = ({ post }) => {
  return (
    <article>
      <header>
        <h2>
          <Link to={post.fields.slug}>
            {post.frontmatter.title}
          </Link>
        </h2>
        <small>{post.frontmatter.date}</small>
      </header>
      <section>
        <p>{post.frontmatter.description || post.excerpt}</p>
      </section>
    </article>
  )
}
BlogPostPreview.propTypes = {
  post: PropTypes.shape({
    fields: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
    frontmatter: PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      description: PropTypes.string,
    }).isRequired,
    excerpt: PropTypes.string,
  }).isRequired,
}

export default BlogPostPreview
