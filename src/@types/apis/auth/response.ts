import { GENERIC_RESPONSE } from "~/@types/apis";

export interface SIGNIN extends GENERIC_RESPONSE {
  data: {
    user: {
      email: string;
      name: string;
      profile_image: string;
      is_verified: boolean;
      is_disabled: boolean;
    },
    token: string;
  }
}

export type SIGNUP = SIGNIN;