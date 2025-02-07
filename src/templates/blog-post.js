import * as React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import ScrollButtonContainer from "../components/button/scroll/allScrollButtonContainer"


const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post },
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`
  const postCategory = post.frontmatter?.category || ``
  const postTitle = post.frontmatter.title

  const previousCategory = previous?.frontmatter.category ? previous.frontmatter.category + ` > ` : ``
  const previousTotalTitle = previous?.frontmatter.title ? previousCategory + previous.frontmatter.title : ``

  const nextCategory = next?.frontmatter.category ? next.frontmatter.category + ` > ` : ``
  const nextTotalTitle = next?.frontmatter.title ? nextCategory + next.frontmatter.title : ``

  return (
    <Layout location={location} title={siteTitle}>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <p>{postCategory}</p>
          <h1 itemProp="headline">{postTitle}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
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
      <ScrollButtonContainer previousLink={previous?.fields.slug} nextLink={next?.fields.slug}/>
    </Layout>
  )
}

export const Head = ({ data: { markdownRemark: post } }) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}
BlogPostTemplate.propTypes = {
  data: PropTypes.shape({
    previous: PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string,
      }),
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        category: PropTypes.string,
      }),
    }),
    next: PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string,
      }),
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        category: PropTypes.string,
      }),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string,
      }),
    }),
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        date: PropTypes.string,
        category: PropTypes.string,
        description: PropTypes.string,
      }),
      html: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.object.isRequired,
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        category
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        category
      }
    }
  }
`
