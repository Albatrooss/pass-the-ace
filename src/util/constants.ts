export const __prod__ = process.env.NODE_ENV === 'production';
// export const __prod__ = true;
export const SOCKET_URL = __prod__
    ? 'https://pass-the-ace.herokuapp.com/'
    : 'http://192.168.0.11:5000/';
