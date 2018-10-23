import { setStore, getStore, clearStore } from "@/utils/storage";

//access_token key.
export const TokenKey = 'access_token';

//refresh_token key
export const REFRESH_TOKEN_key = "refresh_token";

//get access_token
export function getToken() {
  return getStore(TokenKey)
}

//set access_token
export function setToken(access_token,expires_in) {
  // key, token, timeout = 604800s
  return setStore(TokenKey, access_token, expires_in)
}

//rm access_token
export function removeToken() {
  return clearStore(TokenKey)
}

//get refresh_token
export function getRefreshToken() {
  return getStore(REFRESH_TOKEN_key)
}

//set refresh_token
export function setRefreshToken(refresh_token) {
  return setStore(REFRESH_TOKEN_key, refresh_token, 1296000)
}

//rm refresh_token
export function removeRefreshToken() {
  return clearStore(REFRESH_TOKEN_key)
}