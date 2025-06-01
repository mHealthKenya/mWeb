import { IconDefinition } from '@fortawesome/free-regular-svg-icons'
import {
  faArrows,
  faGauge,
  faMap,
  faPersonPregnant,
  faQuestion
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
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
      <SidebarNavItem icon={faGauge} href="/chp">
        Dashboard
      </SidebarNavItem>

      <SidebarNavTitle>Records</SidebarNavTitle>
      <SidebarNavItem icon={faPersonPregnant} href="/chp/mothers">
        Mothers
      </SidebarNavItem>
      <SidebarNavItem icon={faArrows} href="/chp/followup">
        Follow Up
      </SidebarNavItem>
      {/* <SidebarNavItem icon={faEnvelope} href="/chp/appointments">
        Appointments
      </SidebarNavItem> */}
      <SidebarNavItem icon={faQuestion} href="/chp/enquiry">
        Enquiries
      </SidebarNavItem>
      <SidebarNavTitle>Coverage</SidebarNavTitle>

      <SidebarNavItem icon={faMap} href="/chp/coverage">
        Map View
      </SidebarNavItem>
    </ul>
  )
}
