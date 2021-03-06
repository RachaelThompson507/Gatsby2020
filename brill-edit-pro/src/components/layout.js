/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { graphql, StaticQuery, Link } from "gatsby"
import styled from "styled-components"
import "./layout.css"

const Main = styled.main`
  margin: 0 auto;
`

const navigationQuery = graphql`
  query NavigationQuery {
    prismic {
      allNavigations {
        edges {
          node {
            branding
            navigation {
              label
              link {
                ... on PRISMIC_Page {
                  page_title
                  _meta {
                    uid
                  }
                }
                ... on PRISMIC_Contact_page {
                  _meta {
                    uid
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
const NavLink = styled.div`
  margin: auto 0;
  a {
    padding: 0 16px;
    color: white;
    text-decoration: none;
    font-weight: bold;
    font-size: 16px;

    &:hover {
      color: hotpink;
    }
  }
`

const Header = styled.header`
  display: flex;
  background: black;
  height: 66px;
  padding: 0 16px;
  box-sizing: boarder-box;
`

const NavLinks = styled.div`
  margin-left: auto;
  display: flex;
`

const Branding = styled.div`
  color: hotpink;
  font-weight: bold;
  margin: auto 0;
  font-size: 20px;
`

const Layout = ({ children }) => {
  return (
    <>
      <Header>
        <StaticQuery
          query={`${navigationQuery}`}
          render={data => {
            return (
              <>
                <Branding>
                  {data.prismic.allNavigations.edges[0].node.branding}
                </Branding>
                <NavLinks>
                  {data.prismic.allNavigations.edges[0].node.navigation.map(
                    link => {
                      return (
                        <NavLink key={link.link._meta.uid}>
                          <Link to={`/${link.link._meta.uid}`}>
                            {link.label}
                          </Link>
                        </NavLink>
                      )
                    }
                  )}
                </NavLinks>
              </>
            )
          }}
        />
      </Header>
      <Main>{children}</Main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
