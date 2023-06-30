import { rolesAdmin, rolesSuperAdmin } from './roles'

describe('Roles based on user level', () => {
  it('should have all roles for a super admin', () => {
    expect(rolesSuperAdmin).toEqual(['Admin', 'Facility Admin', 'CHV', 'Mother'])
  })

  it('should have all roles for admin', () => {
    expect(rolesAdmin).toEqual(['Facility Admin', 'CHV', 'Mother'])
  })
})
