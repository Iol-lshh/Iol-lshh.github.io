/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            instagram
            github
            linkedin
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social
  const {instagram, github, linkedin} = social


  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="https://avatars.githubusercontent.com/u/37289223?v=4"
        width={75}
        height={75}
        quality={75}
        alt="Profile picture"
      />
      {author?.name && (
        <p>
          <strong>{author.name}</strong>
          <br />
          {author?.summary || null}
          <br />
          <a href={`https://github.com/${github}`}>
            <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white" />
          </a>
          {` `}
          <a href={`https://www.linkedin.com/${linkedin}`}>
            <img src="https://img.shields.io/badge/linkedin-007CC3?style=for-the-badge&logo=linkedin&logoColor=white" />
          </a>
          {` `}
          <a href={`https://www.instagram.com/${instagram}`}>
            <img src="https://img.shields.io/badge/instagram-FF0069?style=for-the-badge&logo=instagram&logoColor=white" />
          </a>
        </p>
      )}
    </div>
  )
}

export default Bio
