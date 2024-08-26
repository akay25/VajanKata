import { AxiosResponse } from 'axios';
import request from './axios';
import URLS from './urls';
import { GENERIC_RESPONSE } from "~/@types/apis";
import * as API_INPUTS from "~/@types/apis/auth/inputs";
import * as API_RESPONSES from '~/@types/apis/auth/response';

export function signin(data: API_INPUTS.SIGNIN): Promise<AxiosResponse<API_RESPONSES.SIGNIN>> {
  return request({
    url: URLS.SIGNIN,
    method: 'post',
    data,
  });
}

export function signout() {
  return request({
    url: URLS.LOGOUT,
  });
}

export function signup(data: API_INPUTS.SIGNIN): Promise<AxiosResponse<API_RESPONSES.SIGNUP>> {
  return request({
    url: URLS.SIGNUP,
    method: 'post',
    data,
  });
}

export function sendPasswordResetOTP(data: API_INPUTS.SEND_FORGET_PASSWORD): Promise<AxiosResponse<GENERIC_RESPONSE>> {
  return request({
    url: URLS.PASSWORD_RESET,
    method: 'post',
    data,
  });
}

export function changePasswordUsingOTP(data: any) {
  return request({
    url: URLS.PASSWORD_RESET,
    method: 'patch',
    data,
  });
}