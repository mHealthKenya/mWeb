'use client'
import SharedModal from '@components/Shared/Modal'
import { Facility } from '@models/facility'
import { UserByRole } from '@models/user-by-role'
import useEditUser, { EditUser } from '@services/users/edit-user'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@ui/ui/dropdown-menu'
import { Check, Edit, Eye, Loader2, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { FC, ReactNode, useState } from 'react'
import EditUserWithRoleComponent from '../Edit'

interface Drop {
  label: string
  user: UserByRole
  facilities: Facility[]
}

const CHVsDropDown: FC<{ drop: Drop; children: ReactNode }> = ({
  drop: { label, user, facilities },
  children
}) => {
  const [open, setOpen] = useState(false)

  const handleToggle = () => {
    setOpen(!open)
  }

  const { mutate: editUser, isLoading } = useEditUser(() => {})

  const handleDeactivate = (user: UserByRole) => {
    const person: EditUser = {
      id: user.id,
      f_name: user.f_name,
      l_name: user.l_name,
      email: user.email,
      phone_number: user.phone_number,
      gender: user.gender,
      role: user.role,
      facilityId: user.facilityId,
      active: !user.active,
      national_id: user.national_id
    }

    editUser(person)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{label} </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href={`/sadmin/users/${user.id}`} className="no-underline text-black">
              <DropdownMenuItem className="cursor-pointer">
                <Eye className="mr-2 h-4 w-4" />
                <span>See Mothers Registered </span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="cursor-pointer" onClick={handleToggle}>
              <Edit className="mr-2 h-4 w-4" />
              <span>Edit </span>
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer" onClick={() => handleDeactivate(user)}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2" />
              ) : user.active ? (
                <Trash2 className="mr-2 h-4 w-4" color="red" />
              ) : (
                <Check className="mr-2 h-4 w-4" color="green" />
              )}
              <span>{user.active ? 'Deactivate' : 'Activate'} </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <SharedModal
        items={{
          open,
          handleToggle
        }}>
        <EditUserWithRoleComponent
          user={user}
          handleToggle={handleToggle}
          facilities={facilities}
        />
      </SharedModal>
    </>
  )
}

export default CHVsDropDown
