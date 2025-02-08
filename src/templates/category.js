import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout/layout'
import Seo from '../components/seo'
import ScrollButtonContainer from "../components/button/scroll/updownScrollButtonContainer"
import ArticleList from "../components/article/articleList"
import PropTypes from 'prop-types'

const CategoryTemplate = ({ data, pageContext, location }) => {
  const { category } = pageContext
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={`Posts in category "${category}"`} />
      <h1>{category}</h1>
      <ArticleList posts={posts} />
      <ScrollButtonContainer />
    </Layout>
  )
}

CategoryTemplate.propTypes = {
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
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
}

export default CategoryTemplate

export const pageQuery = graphql`
  query($category: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { category: { in: [$category] } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
            category
          }
        }
      }
    }
  }
`