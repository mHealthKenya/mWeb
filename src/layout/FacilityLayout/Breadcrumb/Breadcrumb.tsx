import { useRouter } from 'next/router'
import React from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb'

export default function Breadcrumbs() {
  const router = useRouter()

  const path = router.pathname.replace('/', '').split('/')

  return (
    <Breadcrumb listProps={{ className: 'mb-0 align-items-center' }}>
      {path.map((item, index) => (
        <React.Fragment key={index}>
          <Breadcrumb.Item
            linkProps={{ className: 'text-decoration-none' }}
            href={'/' + path.slice(0, index + 1).join('/')}>
            {item}
          </Breadcrumb.Item>
        </React.Fragment>
      ))}
    </Breadcrumb>
  )
}
