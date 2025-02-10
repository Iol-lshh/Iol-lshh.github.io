import React from "react"
import { useState } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout/layout"
import Seo from "../components/seo"
import ScrollButtonContainer from "../components/button/scroll/updownScrollButtonContainer"
import ArticleList from "../components/article/articleList"
import Search from "../components/search/search"
import PropTypes from "prop-types"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `The Engineer, Aiming Fine.`
  const posts = data.allMarkdownRemark.edges
  const [filteredPosts, setFilteredPosts] = useState(posts)

  const handleSearch = (filtered) => {
    setFilteredPosts(filtered)
  }

  return (
    <Layout location={location} title={siteTitle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Search onSearch={handleSearch} />
      </div>
      <ArticleList posts={filteredPosts} />
      <ScrollButtonContainer />
    </Layout>
  )
}

BlogIndex.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string,
      }),
    }),
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
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
      ),
    }),
  }).isRequired,
  location: PropTypes.object.isRequired,
}

export default BlogIndex

export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            category
            description
          }
        }
      }
    }
  }
`