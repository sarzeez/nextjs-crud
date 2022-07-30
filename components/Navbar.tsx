import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'

const NavbarComp = () => {
  const { user, logout } = useAuth();
  const router = useRouter()
  return (
    <Navbar bg="light" expand="lg" variant="light" style={{marginBottom: '20px'}}>
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand>iamzee</Navbar.Brand>
        </Link>
        <Nav className="me-auto">
          <Link href="/posts" passHref>
            <Nav.Link>Posts</Nav.Link>
          </Link>
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav >
            {
              user ? (
                <Nav.Link
                  onClick={() => {
                    logout();
                    router.push('/login')
                  }}
                  >
                    Logout
                  </Nav.Link>
              ) : (
                <>
                  <Link href="/signup" passHref>
                      <Nav.Link>Signup</Nav.Link>
                  </Link>
                  <Link href="/login" passHref>
                      <Nav.Link>Login</Nav.Link>
                  </Link>
                </>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarComp