import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const ArticleList = ({ posts }) => {
  return (
    <ol style={{ listStyle: `none` }}>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        const postCategory = node.frontmatter.category || []

        return (
          <li key={node.fields.slug}>
            <article
              className="post-list-item"
              itemScope
              itemType="http://schema.org/Article"
            >
              <header>
                <small>{postCategory.join(', ')}</small>
                <h2>
                  <Link to={node.fields.slug} itemProp="url">
                    <span itemProp="headline">{title}</span>
                  </Link>
                </h2>
                <small>{node.frontmatter.date}</small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                  itemProp="description"
                />
              </section>
            </article>
          </li>
        )
      })}
    </ol>
  )
}

ArticleList.propTypes = {
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
}

export default ArticleList