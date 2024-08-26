type PLATFORMS = "android" | "ios" | "web" | "windows" | "macos";

export interface SIGNIN {
  email: string;
  password: string;
  fcmToken: string;
  platform: PLATFORMS;
}

export interface SIGNUP {
  name: string;
  email: string;
  password: string;
  platform: PLATFORMS;
}

export interface SEND_FORGET_PASSWORD {
  email: string;
}