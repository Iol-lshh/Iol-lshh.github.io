import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout/layout"
import Seo from "../components/seo"
import ScrollButtonContainer from "../components/button/scroll/updownScrollButtonContainer"
import ArticleList from "../components/article/articleList"
import PropTypes from "prop-types"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `The Engineer, Aiming Fine.`
  const posts = data.allMarkdownRemark.edges

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <p>No blog posts found.</p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <ArticleList posts={posts} />
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