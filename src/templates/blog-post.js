import * as React from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout/layout"
import Seo from "../components/seo"
import ScrollButtonContainer from "../components/button/scroll/allScrollButtonContainer"
import Pagination from "../components/pagination/postPagination"

const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post },
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`
  const postCategories = post.frontmatter?.category || []
  const postTitle = post.frontmatter.title

  return (
    <Layout location={location} title={siteTitle}>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <p>
            {postCategories.map((category, index) => (
              <React.Fragment key={category}>
                <Link to={`/categories/${category}/`}>{category}</Link>
                {index < postCategories.length - 1 && ", "}
              </React.Fragment>
            ))}
          </p>
          <h1 itemProp="headline">{postTitle}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
      </article>
      <Pagination postCategories={postCategories} />
      <ScrollButtonContainer previousLink={previous?.fields.slug} nextLink={next?.fields.slug}/>
    </Layout>
  )
}

export const Head = ({ data, location }) => {
  const { site, markdownRemark: post } = data;
  let imageUrl = null;
  
  if (post.frontmatter.featuredImage?.childImageSharp?.gatsbyImageData) {
    const imageData = post.frontmatter.featuredImage.childImageSharp.gatsbyImageData;
    imageUrl = `${site.siteMetadata.siteUrl}${imageData.images.fallback.src}`;
  } 
  else if (post.images && post.images.length > 0) {
    const imageData = post.images[0].childImageSharp.gatsbyImageData;
    imageUrl = `${site.siteMetadata.siteUrl}${imageData.images.fallback.src}`;
  }
  else {
    const imgRegex = /<img[^>]+src=["']?([^"'\s>]+)["']?[^>]*>/g;
    const match = imgRegex.exec(post.html);
    if (match && match[1]) {
      imageUrl = match[1];
      if (!imageUrl.startsWith('http')) {
        // 절대 경로인지 확인 (슬래시로 시작하는지)
        imageUrl = imageUrl.startsWith('/') 
          ? `${site.siteMetadata.siteUrl}${imageUrl}`
          : `${site.siteMetadata.siteUrl}/${imageUrl}`;
      }
    }
  }
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
      location={location}
      image={imageUrl}
      meta={[
        {
          name: "article:published_time",
          content: post.frontmatter.date,
        },
        {
          name: "article:tag",
          content: Array.isArray(post.frontmatter.tags) ? post.frontmatter.tags.join(", ") : (post.frontmatter.tags || ""),
        },
      ]}
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
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string,
        siteUrl: PropTypes.string,
      }),
    }),
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        date: PropTypes.string,
        category: PropTypes.arrayOf(PropTypes.string),
        description: PropTypes.string,
        featuredImage: PropTypes.object,
      }),
      html: PropTypes.string,
      images: PropTypes.array,
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
        siteUrl
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      images {
        childImageSharp {
          gatsbyImageData
        }
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        category
        featuredImage {
          childImageSharp {
            gatsbyImageData
          }
        }
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
