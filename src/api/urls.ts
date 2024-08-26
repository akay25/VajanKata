export const V1 = {
  // Basic auth
  SIGNUP: '/v1/auth/sign-up/',
  SIGNIN: '/v1/auth/sign-in/',
  LOGOUT: '/v1/auth/sign-out/',

  VERIFY_OTP: '/v1/auth/email-verify/',
  RESEND_VERIFY_OTP: '/v1/auth/resend-verify-otp/',

  PASSWORD_RESET: '/v1/auth/password-reset/',

  // Profile
  PROFILE: '/v1/profile/',
  CHANGE_PASSWORD: '/v1/profile/change-password',
  TOGGLE_EMAIL_NOTIFICATIONS: '/v1/profile/receive-emails',
  TOGGLE_PUSH_NOTIFICATIONS: '/v1/profile/receive-notifications',
  UPDATE_PROFILE_PIC: '/v1/profile/profile-pic',

  // Public APIs
  COUNTRIES: '/v1/countries/',

  // Custom bugs screen
  BUGS: '/v1/bugs',
};

export default V1;
