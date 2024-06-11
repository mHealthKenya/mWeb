import wrapper from '@config/testing'
import { addUser } from '@services/users/add-user'
import { useMutation } from '@tanstack/react-query'
import { act, fireEvent, render, renderHook, screen } from '@testing-library/react'
import { Facility } from '../../models/facility'
import AddUserComponent, { AddUserFormProps } from './Add'

const mockFacilities: Facility[] = [
  {
    id: 'xxxxxxxxx',
    name: 'some facility',
    status: 'Active',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

describe('Add User', () => {
  it('has a form heading', () => {
    render(<AddUserComponent facilities={mockFacilities} />, { wrapper })
    const title = screen.getByText('Add a user')
    expect(title).toBeDefined()
  })

  it('has all form inputs and submits the form', () => {
    render(<AddUserComponent facilities={mockFacilities} />, { wrapper })
    //First name
    const f_name = screen.getByTestId('f_name_input') as HTMLInputElement
    expect(f_name).toBeInTheDocument()
    expect(f_name.value).toEqual('')
    fireEvent.change(f_name, { target: { value: 'John' } })
    expect(f_name.value).toBe('John')

    //Last name
    const l_name = screen.getByTestId('l_name_input') as HTMLInputElement
    expect(l_name).toBeInTheDocument()
    expect(l_name.value).toEqual('')
    fireEvent.change(l_name, { target: { value: 'Doe' } })
    expect(l_name.value).toBe('Doe')

    //Email
    const email = screen.getByTestId('email_input') as HTMLInputElement
    expect(email).toBeInTheDocument()
    expect(email.value).toEqual('')
    fireEvent.change(email, { target: { value: 'johndoe@gmail.com' } })
    expect(email.value).toBe('johndoe@gmail.com')

    //Phone
    const phone = screen.getByTestId('phone_input') as HTMLInputElement
    expect(phone).toBeInTheDocument()
    expect(phone.value).toEqual('')
    fireEvent.change(phone, { target: { value: '245712345678' } })
    expect(phone.value).toBe('245712345678')

    //National ID

    const id = screen.getByTestId('id_input') as HTMLInputElement
    expect(id).toBeInTheDocument()
    expect(id.value).toEqual('')
    fireEvent.change(id, { target: { value: '712345678' } })
    expect(id.value).toBe('712345678')

    //Facility
    const facility = screen.getByTestId('facility_input') as HTMLInputElement
    expect(facility).toBeInTheDocument()
    expect(facility.value).toEqual('')
    fireEvent.change(facility, { target: { value: 'xxxxxxxxx' } })
    expect(facility.value).toBe('xxxxxxxxx')

    //Role
    const role = screen.getByTestId('role_input') as HTMLInputElement
    expect(role).toBeInTheDocument()
    expect(role.value).toEqual('')
    fireEvent.change(role, { target: { value: 'Admin' } })
    expect(role.value).toBe('Admin')

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
  })

  it('should add a user', async () => {
    render(<AddUserComponent facilities={mockFacilities} />, { wrapper })

    const mockAddUser = jest.fn(addUser)

    const { result } = renderHook(() => useMutation(mockAddUser), { wrapper })

    const { mutate } = result.current

    const data: AddUserFormProps = {
      f_name: 'john',
      l_name: 'doe',
      email: 'johndoe@gmail.com',
      phone_number: '2548096751234',
      national_id: '8096751234',
      role: 'Admin',
      facilityId: 'xxxxxxxx',
      gender: 'Female'
    }

    await act(async () => {
      await mutate(data)
    })

    expect(mockAddUser).toHaveBeenCalledWith(data)
  })
})
