import Breadcrumb from 'react-bootstrap/Breadcrumb'

export default function Breadcrumbs() {
  return (
    <Breadcrumb listProps={{ className: 'mb-0 align-items-center' }}>
      <Breadcrumb.Item linkProps={{ className: 'text-decoration-none' }} href="/">
        Home
      </Breadcrumb.Item>
      <Breadcrumb.Item linkProps={{ className: 'text-decoration-none' }} href="/">
        Library
      </Breadcrumb.Item>
      <Breadcrumb.Item active>Data</Breadcrumb.Item>
    </Breadcrumb>
  )
}
