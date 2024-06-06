import Modal from '@mui/material/Modal'
import { FC, ReactNode } from 'react'

interface ModalProps {
  open: boolean
  handleToggle: () => void
}

const SharedModal: FC<{ items: ModalProps; children: ReactNode }> = ({ items, children }) => {
  const { open, handleToggle } = items

  return (
    <div>
      <Modal
        open={open}
        onClose={handleToggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <>{children}</>
      </Modal>
    </div>
  )
}

export default SharedModal
