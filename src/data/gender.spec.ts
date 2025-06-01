import { gender } from './gender'

describe('Gender Data', () => {
  // Tests that the function returns an empty array when the input is not an array
  it('should have male and female', () => {
    expect(gender).toEqual(['Female', 'Male'])
  })
})
