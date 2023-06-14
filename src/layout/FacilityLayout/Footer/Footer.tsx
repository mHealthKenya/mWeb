import React from 'react'
import Container from 'react-bootstrap/Container'

export default function Footer() {
  return (
    <footer className="footer border-top px-sm-2 py-2">
      <Container
        fluid
        className="align-items-center flex-column flex-md-row d-flex justify-content-between">
        <div>
          <a className="text-decoration-none" href="https://mhealthkenya.org">
            mHealth Kenya{' '}
          </a>
          <a className="text-decoration-none" href="https://coreui.io">
            World Friends
          </a>{' '}
          © {new Date().getFullYear()}
        </div>
      </Container>
    </footer>
  )
}
