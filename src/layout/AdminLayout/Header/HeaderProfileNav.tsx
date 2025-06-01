import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Cookies from 'js-cookie'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { PropsWithChildren } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import Nav from 'react-bootstrap/Nav'
import NavItem from 'react-bootstrap/NavItem'

type ItemWithIconProps = {
  icon: IconDefinition
} & PropsWithChildren

const ItemWithIcon = (props: ItemWithIconProps) => {
  const { icon, children } = props

  return (
    <>
      <FontAwesomeIcon className="me-2" icon={icon} fixedWidth />
      {children}
    </>
  )
}

export default function HeaderProfileNav() {
  const router = useRouter()

  const logout = async () => {
    await Cookies.remove('access-token')
    router.push('/login')
  }

  return (
    <Nav>
      <Dropdown as={NavItem}>
        <Dropdown.Toggle
          variant="link"
          bsPrefix="hide-caret"
          className="py-0 px-2"
          id="dropdown-profile">
          <div className="avatar position-relative">
            <Image
              className="rounded-circle"
              src="/assets/arrow.png"
              alt="user@email.com"
              width={50}
              height={50}
            />
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu className="pt-0">
          {/* <Dropdown.Header className="bg-light fw-bold rounded-top">Account</Dropdown.Header>
          <Link href="#" passHref legacyBehavior>
            <Dropdown.Item>
              <ItemWithIcon icon={faBell}>
                Updates
                <Badge bg="info" className="ms-2">
                  42
                </Badge>
              </ItemWithIcon>
            </Dropdown.Item>
          </Link>
          <Link href="#" passHref legacyBehavior>
            <Dropdown.Item>
              <ItemWithIcon icon={faEnvelopeOpen}>
                Updates
                <Badge bg="success" className="ms-2">
                  42
                </Badge>
              </ItemWithIcon>
            </Dropdown.Item>
          </Link>
          <Link href="#" passHref legacyBehavior>
            <Dropdown.Item>
              <ItemWithIcon icon={faListCheck}>
                Tasks
                <Badge bg="danger" className="ms-2">
                  42
                </Badge>
              </ItemWithIcon>
            </Dropdown.Item>
          </Link>
          <Link href="#" passHref legacyBehavior>
            <Dropdown.Item>
              <ItemWithIcon icon={faMessage}>
                Messages
                <Badge bg="warning" className="ms-2">
                  42
                </Badge>
              </ItemWithIcon>
            </Dropdown.Item>
          </Link> */}

          {/* <Dropdown.Header className="bg-light fw-bold">Settings</Dropdown.Header>

          <Link href="#" passHref legacyBehavior>
            <Dropdown.Item>
              <ItemWithIcon icon={faUser}>Profile</ItemWithIcon>
            </Dropdown.Item>
          </Link>
          <Link href="#" passHref legacyBehavior>
            <Dropdown.Item>
              <ItemWithIcon icon={faGear}>Settings</ItemWithIcon>
            </Dropdown.Item>
          </Link>
          <Link href="#" passHref legacyBehavior>
            <Dropdown.Item>
              <ItemWithIcon icon={faCreditCard}>Payments</ItemWithIcon>
            </Dropdown.Item>
          </Link>
          <Link href="#" passHref legacyBehavior>
            <Dropdown.Item>
              <ItemWithIcon icon={faFile}>Projects</ItemWithIcon>
            </Dropdown.Item>
          </Link>

          <Dropdown.Divider /> */}

          {/* <Link href="#" passHref legacyBehavior>
            <Dropdown.Item>
              <ItemWithIcon icon={faLock}>Lock Account</ItemWithIcon>
            </Dropdown.Item>
          </Link> */}
          <Dropdown.Item onClick={logout}>
            <ItemWithIcon icon={faPowerOff}>Logout</ItemWithIcon>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav>
  )
}
