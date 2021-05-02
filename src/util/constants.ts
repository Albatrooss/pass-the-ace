// export const __prod__ = process.env.NODE_ENV === 'production';
export const __prod__ = true;
export const SOCKET_URL = __prod__
    ? 'https://pass-the-ace.herokuapp.com/'
    : 'http://localhost:5000/';
