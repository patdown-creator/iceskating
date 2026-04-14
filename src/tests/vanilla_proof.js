import { getDemoRole, formatNameFromEmail } from '../lib/authUtils.js';

const runTest = (name, assertion) => {
  try {
    assertion();
    console.log(`✅ PASS: ${name}`);
  } catch (err) {
    console.error(`❌ FAIL: ${name}`);
    console.error(err);
    process.exit(1);
  }
};

console.log('--- SKATESCHOOL AUTH CORE LOGIC TEST ---');

runTest('Admin role detection', () => {
    const role = getDemoRole('admin@skate.com');
    if (role !== 'admin') throw new Error(`Expected admin, got ${role}`);
});

runTest('Instructor role detection', () => {
    const role = getDemoRole('instructor@skate.com');
    if (role !== 'instructor') throw new Error(`Expected instructor, got ${role}`);
});

runTest('Default Student role detection', () => {
    const role = getDemoRole('student@skate.com');
    if (role !== 'student') throw new Error(`Expected student, got ${role}`);
});

runTest('Formatting Name from Email', () => {
    const name = formatNameFromEmail('patrick@skate.com');
    if (name !== 'PATRICK') throw new Error(`Expected PATRICK, got ${name}`);
});

console.log('\n--- ALL UNIT TESTS PASSED SUCCESSFULLY ---');
