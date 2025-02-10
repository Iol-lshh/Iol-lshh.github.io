import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import './articleList.css' // CSS 파일을 임포트

const ArticleList = ({ posts }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 10

  // Calculate the indices for the current page
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  // Calculate total pages
  const totalPages = Math.ceil(posts.length / postsPerPage)

  // Reset currentPage to 1 when posts change
  useEffect(() => {
    setCurrentPage(1)
  }, [posts])

  return (
    <>
      <ol style={{ listStyle: `none` }}>
        {currentPosts.map(({ node }) => {
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
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            disabled={currentPage === i + 1}
            className="pagination-button" // CSS 클래스 추가
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
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