import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Container, NavDropdown, Nav } from 'react-bootstrap'

const BasicNavbar = () => {
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>
            <Nav.Link as={NavLink} to="/">
                Recipe Collection
            </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav variant="underline" className="me-auto" defaultActiveKey="/">
            <Nav.Item>
                <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={NavLink} to="/asdf">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={NavLink} to="/search">Search</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default BasicNavbar