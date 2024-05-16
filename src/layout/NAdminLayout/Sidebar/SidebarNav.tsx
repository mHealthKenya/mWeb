import { IconDefinition } from '@fortawesome/free-regular-svg-icons'
import {
  faAdd,
  faDatabase,
  faGauge,
  faLocation,
  faMap,
  faUserAlt,
  faUserCheck,
  faUserNurse,
  faWallet
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import Badge from 'react-bootstrap/Badge'
import Nav from 'react-bootstrap/Nav'

type SidebarNavItemProps = {
  href: string
  icon?: IconDefinition
} & PropsWithChildren

const SidebarNavItem = (props: SidebarNavItemProps) => {
  const { icon, children, href } = props

  return (
    <Nav.Item>
      <Link href={href} passHref legacyBehavior>
        <Nav.Link className="px-3 py-2 d-flex align-items-center">
          {icon ? (
            <FontAwesomeIcon className="nav-icon ms-n3" icon={icon} />
          ) : (
            <span className="nav-icon ms-n3" />
          )}
          {children}
        </Nav.Link>
      </Link>
    </Nav.Item>
  )
}

const SidebarNavTitle = (props: PropsWithChildren) => {
  const { children } = props

  return <li className="nav-title px-3 py-2 mt-3 text-uppercase fw-bold">{children}</li>
}

export default function SidebarNav() {
  return (
    <ul className="list-unstyled">
      <SidebarNavItem icon={faGauge} href="/admin">
        Dashboard
        <small className="ms-auto">
          <Badge bg="info" className="ms-auto">
            NEW
          </Badge>
        </small>
      </SidebarNavItem>

      <SidebarNavTitle>Users</SidebarNavTitle>
      <SidebarNavItem icon={faAdd} href="/admin/users">
        Add User
      </SidebarNavItem>
      <SidebarNavItem icon={faUserNurse} href="/admin/users/facility">
        Facility Admins
      </SidebarNavItem>
      <SidebarNavItem icon={faUserAlt} href="/admin/users/chp">
        CHPs
      </SidebarNavItem>
      <SidebarNavItem icon={faUserCheck} href="/admin/users/mother">
        Mothers
      </SidebarNavItem>

      <SidebarNavTitle>Wallet</SidebarNavTitle>
      <SidebarNavItem icon={faDatabase} href="">
        Wallet Stats
      </SidebarNavItem>
      <SidebarNavItem icon={faWallet} href="/admin/wallet/all">
        Manage Wallet
      </SidebarNavItem>

      <SidebarNavTitle>Coverage</SidebarNavTitle>
      <SidebarNavItem icon={faLocation} href="/admin/facilities">
        Facilities
      </SidebarNavItem>
      <SidebarNavItem icon={faMap} href="/admin/coverage">
        Map View
      </SidebarNavItem>
    </ul>
  )
}
