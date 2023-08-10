import { fireEvent, render, renderHook, screen } from '@testing-library/react'
import EditUserWithRoleComponent from './Edit'
import { UserByRole } from '@models/user-by-role'
import wrapper from '@config/testing'
import { editUser } from '@services/users/edit-user'
import { useMutation } from '@tanstack/react-query'

let val = false

const handleToggle = () => {
  return (val = !val)
}

const mockUser: UserByRole = {
  id: 'sampleid',
  f_name: 'john',
  l_name: 'doe',
  gender: 'Female',
  email: 'johndoe@gmail.com',
  phone_number: '254123456785',
  national_id: '123456785',
  role: 'Mother',
  createdAt: new Date(),
  updatedAt: new Date(),
  facilityAdmin: null,
  facilityId: 'facilityid',
  Facility: {
    name: 'Test Facility',
    id: 'facilityid'
  },
  // password: '',
  // BioData: []
}

describe('Edit User', () => {
  it('should have a title', () => {
    render(<EditUserWithRoleComponent user={mockUser} handleToggle={handleToggle} />, { wrapper })

    const title = screen.getByText('Edit User')
    expect(title).toBeInTheDocument()
  })
  it('should have a working first name input', () => {
    render(<EditUserWithRoleComponent user={mockUser} handleToggle={handleToggle} />, { wrapper })

    const f_name = screen.getByTestId('f_name_input') as HTMLInputElement
    expect(f_name).toBeInTheDocument()
    expect(f_name.value).toEqual(mockUser.f_name)

    fireEvent.change(f_name, { target: { value: 'Mark' } })
    expect(f_name.value).toEqual('Mark')
  })

  it('should have a working last name input', () => {
    render(<EditUserWithRoleComponent user={mockUser} handleToggle={handleToggle} />, { wrapper })

    const l_name = screen.getByTestId('l_name_input') as HTMLInputElement
    expect(l_name).toBeInTheDocument()
    expect(l_name.value).toEqual(mockUser.l_name)

    fireEvent.change(l_name, { target: { value: 'mary' } })
    expect(l_name.value).toEqual('mary')
  })

  it('should have a working email input', () => {
    render(<EditUserWithRoleComponent user={mockUser} handleToggle={handleToggle} />, { wrapper })

    const email = screen.getByTestId('email_input') as HTMLInputElement

    expect(email).toBeInTheDocument()
    expect(email.value).toEqual(mockUser.email)

    fireEvent.change(email, { target: { value: 'johnmary@gmail.com' } })
    expect(email.value).toEqual('johnmary@gmail.com')
  })

  it('should have a working role select field', () => {
    render(<EditUserWithRoleComponent user={mockUser} handleToggle={handleToggle} />, { wrapper })

    const role = screen.getByTestId('role_input') as HTMLInputElement
    expect(role).toBeInTheDocument()
    expect(role.value).toEqual(mockUser.role)

    fireEvent.change(role, { target: { value: 'Admin' } })
    expect(role.value).toEqual('Admin')
  })

  it('should make an edit to the user data', () => {
    render(<EditUserWithRoleComponent user={mockUser} handleToggle={handleToggle} />, { wrapper })


    
    const role = screen.getByTestId('role_input') as HTMLInputElement
    expect(role).toBeInTheDocument()
    expect(role.value).toEqual(mockUser.role)

    fireEvent.change(role, { target: { value: 'Admin' } })
    expect(role.value).toEqual('Admin')

    //Gender
    const female = screen.getByLabelText('Female') as HTMLInputElement
    expect(female).toBeInTheDocument()
    const male = screen.getByLabelText('Male') as HTMLInputElement
    expect(male).toBeInTheDocument()

    //? Select 'Male'
    fireEvent.click(male)
    expect(male.checked).toBe(true)
    expect(female.checked).toBe(false)

    //? Select 'Female'
    fireEvent.click(female)
    expect(female.checked).toBe(true)
    expect(male.checked).toBe(false)

    const mockEditUser = jest.fn(editUser)

    const { result } = renderHook(() => useMutation(mockEditUser), { wrapper })

    const submitButton = screen.getByTestId('submit_button')
    expect(submitButton).toBeInTheDocument()
  })
})
