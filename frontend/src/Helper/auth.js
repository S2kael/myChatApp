import {getCookie, removeCookie, setCookie, COOKIE_KEY} from './cookie'

export const logout = () => {
    removeCookie(COOKIE_KEY.EMAIL)
    removeCookie(COOKIE_KEY.AVATAR)
    removeCookie(COOKIE_KEY.FULLNAME)
    removeCookie(COOKIE_KEY.USERNAME)
    removeCookie(COOKIE_KEY.USERID)
    window.location.href = '/signin'
}

export const getUser = () => {
    let email = getCookie(COOKIE_KEY.EMAIL)
    return email ? {
        email: email,
        username: getCookie(COOKIE_KEY.USERNAME),
        fullname: getCookie(COOKIE_KEY.FULLNAME),
        avatar: getCookie(COOKIE_KEY.AVATAR),
        userid: getCookie(COOKIE_KEY.USERID)
    } : null
}

export const setUserCookies = (email, username, fullname, avatar, userid) => {
    setCookie(COOKIE_KEY.EMAIL, email)
    setCookie(COOKIE_KEY.USERNAME, username)
    setCookie(COOKIE_KEY.FULLNAME, fullname)
    setCookie(COOKIE_KEY.AVATAR, avatar)
    setCookie(COOKIE_KEY.USERID, userid)
}