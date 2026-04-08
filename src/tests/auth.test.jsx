import { describe, it, expect } from 'vitest'
import { getDemoRole, formatNameFromEmail } from '../lib/authUtils'

describe('Auth Utilities', () => {
  describe('getDemoRole', () => {
    it('should return admin for emails containing "admin"', () => {
      expect(getDemoRole('admin@skate.com')).toBe('admin')
      expect(getDemoRole('SUPERADMIN@TEST.COM')).toBe('admin')
    })

    it('should return instructor for emails containing "instructor"', () => {
      expect(getDemoRole('instructor@skate.com')).toBe('instructor')
      expect(getDemoRole('coach_instructor@test.com')).toBe('instructor')
    })

    it('should return student for other emails', () => {
      expect(getDemoRole('student@skate.com')).toBe('student')
      expect(getDemoRole('patrick@downey.com')).toBe('student')
    })

    it('should return student for empty or null emails', () => {
      expect(getDemoRole('')).toBe('student')
      expect(getDemoRole(null)).toBe('student')
    })
  })

  describe('formatNameFromEmail', () => {
    it('should extract and capitalize the local part of the email', () => {
      expect(formatNameFromEmail('patrick@skate.com')).toBe('PATRICK')
      expect(formatNameFromEmail('john.doe@test.com')).toBe('JOHN.DOE')
    })

    it('should return GUEST for empty or null emails', () => {
      expect(formatNameFromEmail('')).toBe('GUEST')
      expect(formatNameFromEmail(null)).toBe('GUEST')
    })
  })
})
