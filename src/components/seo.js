import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({ title, description, image, lang = "kr", meta = [], children, location }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
          }
        }
      }
    `
  )

  const metaTitle = title || `The Engineer, Aiming Fine.`
  const metaDescription = description || site.siteMetadata.description
  const metaImage = image || `https://avatars.githubusercontent.com/u/37289223?v=4`
  const canonical = `${site.siteMetadata.siteUrl}${location ? location.pathname : ""}`

  // 구조화된 데이터 설정
  const schemaOrgWebPage = {
    "@context": "http://schema.org",
    "@type": "WebPage",
    url: canonical,
    headline: metaTitle,
    inLanguage: lang,
    mainEntityOfPage: canonical,
    description: metaDescription,
    name: metaTitle,
    author: {
      "@type": "Person",
      name: site.siteMetadata.author?.name || "Lshh",
    },
    copyrightHolder: {
      "@type": "Person",
      name: site.siteMetadata.author?.name || "Lshh",
    },
    copyrightYear: new Date().getFullYear(),
    creator: {
      "@type": "Person",
      name: site.siteMetadata.author?.name || "Lshh",
    },
    publisher: {
      "@type": "Person",
      name: site.siteMetadata.author?.name || "Lshh",
    },
    image: {
      "@type": "ImageObject",
      url: metaImage,
    },
    datePublished: new Date().toISOString(),
  }

  // 블로그 포스트에 대한 구조화된 데이터
  const schemaArticle = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    url: canonical,
    name: metaTitle,
    headline: metaTitle,
    image: {
      "@type": "ImageObject",
      url: metaImage,
    },
    description: metaDescription,
    author: {
      "@type": "Person",
      name: site.siteMetadata.author?.name || "lshh",
    },
    publisher: {
      "@type": "Person",
      name: site.siteMetadata.author?.name || "lshh",
      logo: {
        "@type": "ImageObject",
        url: metaImage,
      },
    },
    mainEntityOfPage: canonical,
    datePublished: new Date().toISOString(),
  }

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={metaTitle}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      link={[
        {
          rel: "canonical",
          href: `${site.siteMetadata.siteUrl}${location ? location.pathname : ""}`
        }
      ]}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `robots`,
          content: `index, follow`
        },
        {
          property: `og:title`,
          content: metaTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:url`,
          content: canonical,
        },
        {
          property: `og:image`,
          content: metaImage,
        },
        {
          property: `og:image:alt`,
          content: metaTitle,
        },
        {
          property: `og:site_name`,
          content: site.siteMetadata.title,
        },
      ].concat(meta)}
    >
      {children}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgWebPage)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(schemaArticle)}
      </script>
    </Helmet>
  )
}
SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.node,
  location: PropTypes.object,
}

export default SEO
