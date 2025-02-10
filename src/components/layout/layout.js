import * as React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import Sidebar from "../navi/sidebar"
import Bio from "../bio/bio"
import "./layout.css" 

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location ? location.pathname === rootPath : false
  let header

  header = (
    <h1 className="main-heading">
      <Link to="/">{title}</Link>
    </h1>
  )

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <Sidebar/>
      <header className="global-header">
        <div className="header-container">
          {header}
        </div>
      </header>
      <main>{children}</main>
      <footer>
        <Bio />
      </footer>
    </div>
  )
}

Layout.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Layout