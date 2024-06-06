import Link from 'next/link'
import Nav from 'react-bootstrap/Nav'

export default function HeaderFeaturedNav() {
  return (
    <Nav>
      <Nav.Item>
        <Link href="/facility" passHref legacyBehavior>
          <Nav.Link className="p-2">Dashboard</Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link href="/facility/patients" passHref legacyBehavior>
          <Nav.Link className="p-2">Patients</Nav.Link>
        </Link>
      </Nav.Item>
    </Nav>
  )
}
