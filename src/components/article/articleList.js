import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import ArticlePagination from './articlePagination' // ArticlePagination 컴포넌트 임포트

const ArticleList = ({ posts }) => {
  const [currentPosts, setCurrentPosts] = useState([])
  const postsPerPage = 10

  useEffect(() => {
    setCurrentPosts(posts.slice(0, postsPerPage))
  }, [posts, postsPerPage])

  return (
    <>
      <div style={{
        minHeight: '100vh',
      }}>
        <ol style={{ 
          listStyle: `none`,
          margin: 0, 
          padding: 0,
          width: '100%',
          boxSizing: 'border-box'
        }}>
          {currentPosts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            const postCategory = node.frontmatter.category || []

            return (
              <li key={node.fields.slug} style={{ 
                height: 'auto', 
                minHeight: '110px',
                marginBottom: '1.5rem',
                position: 'relative'
              }}>
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    border: '1px solid #eee',
                    borderRadius: '8px',
                    padding: '1rem',
                    transition: 'transform 0.2s ease-in-out',
                  }}
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
      </div>
      <ArticlePagination
        posts={posts}
        postsPerPage={postsPerPage}
        setCurrentPosts={setCurrentPosts}
      />
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