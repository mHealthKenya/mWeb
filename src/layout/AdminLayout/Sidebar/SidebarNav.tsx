import { IconDefinition } from '@fortawesome/free-regular-svg-icons'
import {
  faAdd,
  faDashboard,
  faGauge,
  faHospital,
  faLocation,
  faMap,
  faMessage,
  faMoneyBill,
  faMoneyBill1Wave,
  faPhone,
  faPlay,
  faUserAlt,
  faUserCheck,
  faUserCircle,
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

// type SidebarNavGroupToggleProps = {
//   eventKey: string
//   icon: IconDefinition
//   setIsShow: (isShow: boolean) => void
// } & PropsWithChildren

// const SidebarNavGroupToggle = (props: SidebarNavGroupToggleProps) => {
//   // https://react-bootstrap.github.io/components/accordion/#custom-toggle-with-expansion-awareness
//   const { activeEventKey } = useContext(AccordionContext)
//   const { eventKey, icon, children, setIsShow } = props

//   const isCurrentEventKey = activeEventKey === eventKey

//   useEffect(() => {
//     setIsShow(activeEventKey === eventKey)
//   }, [activeEventKey, eventKey, setIsShow])

//   return (
//     <Button
//       variant="link"
//       type="button"
//       className={classNames(
//         'rounded-0 nav-link px-3 py-2 d-flex align-items-center flex-fill w-100 shadow-none',
//         {
//           collapsed: !isCurrentEventKey
//         }
//       )}>
//       <FontAwesomeIcon className="nav-icon ms-n3" icon={icon} />
//       {children}
//       <div className="nav-chevron ms-auto text-end">
//         <FontAwesomeIcon size="xs" icon={faChevronUp} />
//       </div>
//     </Button>
//   )
// }

// type SidebarNavGroupProps = {
//   toggleIcon: IconDefinition
//   toggleText: string
// } & PropsWithChildren

// const SidebarNavGroup = (props: SidebarNavGroupProps) => {
//   const { toggleIcon, toggleText, children } = props

//   const [isShow, setIsShow] = useState(false)

//   return (
//     <Accordion as="li" bsPrefix="nav-group" className={classNames({ show: isShow })}>
//       <SidebarNavGroupToggle icon={toggleIcon} eventKey="0" setIsShow={setIsShow}>
//         {toggleText}
//       </SidebarNavGroupToggle>
//       <Accordion.Collapse eventKey="0">
//         <ul className="nav-group-items list-unstyled">{children}</ul>
//       </Accordion.Collapse>
//     </Accordion>
//   )
// }

export default function SidebarNav() {
  return (
    <ul className="list-unstyled">
      <SidebarNavItem icon={faGauge} href="/sadmin">
        Dashboard
        <small className="ms-auto">
          <Badge bg="info" className="ms-auto">
            NEW
          </Badge>
        </small>
      </SidebarNavItem>

      <SidebarNavTitle>Users</SidebarNavTitle>
      <SidebarNavItem icon={faAdd} href="/sadmin/users">
        Add User
      </SidebarNavItem>
      <SidebarNavItem icon={faUserCircle} href="/sadmin/users/admin">
        Admins
      </SidebarNavItem>
      <SidebarNavItem icon={faUserNurse} href="/sadmin/users/facility">
        Facility Admins
      </SidebarNavItem>
      <SidebarNavItem icon={faUserAlt} href="/sadmin/users/chv">
        CHPs
      </SidebarNavItem>
      <SidebarNavItem icon={faUserCheck} href="/sadmin/users/mother">
        Mothers
      </SidebarNavItem>

      <SidebarNavTitle>Communication</SidebarNavTitle>
      <SidebarNavItem icon={faMessage} href="/sadmin/communication/sms">
        SMS
      </SidebarNavItem>

      <SidebarNavTitle>Check Ins</SidebarNavTitle>
      <SidebarNavItem icon={faHospital} href="/sadmin/admissions/all">
        Inpatient
      </SidebarNavItem>
      <SidebarNavItem icon={faHospital} href="/sadmin/outpatient">
        Outpatient
      </SidebarNavItem>

      <SidebarNavTitle>Billing</SidebarNavTitle>
      <SidebarNavItem icon={faDashboard} href="/sadmin/billing/dashboard">
        Dashboard
      </SidebarNavItem>
      <SidebarNavItem icon={faMoneyBill} href="/sadmin/billing">
        Approve Transactions
      </SidebarNavItem>
      <SidebarNavItem icon={faMoneyBill1Wave} href="/sadmin/billing/multiapprove">
        Multi Approve Transactions
      </SidebarNavItem>
      <SidebarNavItem icon={faWallet} href="/sadmin/billing/wallets">
        Wallets
      </SidebarNavItem>

      <SidebarNavItem icon={faPlay} href="/sadmin/billing/base">
        Base
      </SidebarNavItem>

      <SidebarNavTitle>Emergency</SidebarNavTitle>
      <SidebarNavItem icon={faPhone} href="/sadmin/emergency">
        Contacts
      </SidebarNavItem>

      <SidebarNavTitle>Coverage</SidebarNavTitle>
      <SidebarNavItem icon={faLocation} href="/sadmin/facilities">
        Facilities
      </SidebarNavItem>
      <SidebarNavItem icon={faMap} href="/sadmin/coverage">
        Map View
      </SidebarNavItem>

      {/* <SidebarNavTitle>Theme</SidebarNavTitle>
      <SidebarNavItem icon={faDroplet} href="#">
        Colors
      </SidebarNavItem> */}
      {/* <SidebarNavItem icon={faPencil} href="#">
        Typography
      </SidebarNavItem>
      <SidebarNavTitle>Components</SidebarNavTitle>

      <SidebarNavGroup toggleIcon={faPuzzlePiece} toggleText="Base">
        <SidebarNavItem href="#">Accordion</SidebarNavItem>
        <SidebarNavItem href="#">Breadcrumb</SidebarNavItem>
        <SidebarNavItem href="#">Cards</SidebarNavItem>
        <SidebarNavItem href="#">Carousel</SidebarNavItem>
        <SidebarNavItem href="#">Collapse</SidebarNavItem>
        <SidebarNavItem href="#">List group</SidebarNavItem>
        <SidebarNavItem href="#">Navs</SidebarNavItem>
        <SidebarNavItem href="#">Pagination</SidebarNavItem>
        <SidebarNavItem href="#">Popovers</SidebarNavItem>
        <SidebarNavItem href="#">Progress</SidebarNavItem>
        <SidebarNavItem href="#">Scrollspy</SidebarNavItem>
        <SidebarNavItem href="#">Spinners</SidebarNavItem>
        <SidebarNavItem href="#">Tables</SidebarNavItem>
        <SidebarNavItem href="#">Tabs</SidebarNavItem>
        <SidebarNavItem href="#">Tooltips</SidebarNavItem>
      </SidebarNavGroup>

      <SidebarNavGroup toggleIcon={faLocationArrow} toggleText="Buttons">
        <SidebarNavItem href="#">Buttons</SidebarNavItem>
        <SidebarNavItem href="#">Buttons Group</SidebarNavItem>
        <SidebarNavItem href="#">Dropdowns</SidebarNavItem>
      </SidebarNavGroup>

      <SidebarNavItem icon={faChartPie} href="#">
        Charts
      </SidebarNavItem>

      <SidebarNavGroup toggleIcon={faFileLines} toggleText="Forms">
        <SidebarNavItem href="#">Form Control</SidebarNavItem>
        <SidebarNavItem href="#">Select</SidebarNavItem>
        <SidebarNavItem href="#">Checks and radios</SidebarNavItem>
        <SidebarNavItem href="#">Range</SidebarNavItem>
        <SidebarNavItem href="#">Input group</SidebarNavItem>
        <SidebarNavItem href="#">Floating labels</SidebarNavItem>
        <SidebarNavItem href="#">Layout</SidebarNavItem>
        <SidebarNavItem href="#">Validation</SidebarNavItem>
      </SidebarNavGroup>

      <SidebarNavGroup toggleIcon={faStar} toggleText="Icons">
        <SidebarNavItem href="#">CoreUI Icons</SidebarNavItem>
        <SidebarNavItem href="#">CoreUI Icons - Brand</SidebarNavItem>
        <SidebarNavItem href="#">CoreUI Icons - Flag</SidebarNavItem>
      </SidebarNavGroup>

      <SidebarNavGroup toggleIcon={faBell} toggleText="Notifications">
        <SidebarNavItem href="#">Alerts</SidebarNavItem>
        <SidebarNavItem href="#">Badge</SidebarNavItem>
        <SidebarNavItem href="#">Modals</SidebarNavItem>
        <SidebarNavItem href="#">Toasts</SidebarNavItem>
      </SidebarNavGroup>

      <SidebarNavItem icon={faCalculator} href="#">
        Widgets
        <small className="ms-auto">
          <Badge bg="info">NEW</Badge>
        </small>
      </SidebarNavItem>

      <SidebarNavTitle>Extras</SidebarNavTitle>

      <SidebarNavGroup toggleIcon={faStar} toggleText="Pages">
        <SidebarNavItem icon={faRightToBracket} href="login">
          Login
        </SidebarNavItem>
        <SidebarNavItem icon={faAddressCard} href="register">
          Register
        </SidebarNavItem>
        <SidebarNavItem icon={faBug} href="#">
          Error 404
        </SidebarNavItem>
        <SidebarNavItem icon={faBug} href="#">
          Error 500
        </SidebarNavItem>
      </SidebarNavGroup>

      <SidebarNavItem icon={faFileLines} href="#">
        Docs
      </SidebarNavItem>
      <SidebarNavItem icon={faLayerGroup} href="https://coreui.io/pro/">
        Try CoreUI PRO
      </SidebarNavItem> */}
    </ul>
  )
}
