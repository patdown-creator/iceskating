/**
 * Determines the user role based on email markers for demo mode.
 * @param {string} email - The user's email address.
 * @returns {'admin' | 'instructor' | 'student'} The detected role.
 */
export const getDemoRole = (email) => {
  if (!email) return 'student'
  const normalizedEmail = email.toLowerCase()
  if (normalizedEmail.includes('admin')) return 'admin'
  if (normalizedEmail.includes('instructor')) return 'instructor'
  return 'student'
}

/**
 * Formats a name from an email address.
 * @param {string} email - The user's email address.
 * @returns {string} The formatted name.
 */
export const formatNameFromEmail = (email) => {
  if (!email) return 'GUEST'
  return email.split('@')[0].toUpperCase()
}
