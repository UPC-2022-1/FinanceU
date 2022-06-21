/* eslint-disable */
export let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {
    id: 'DefaultId',
    name: 'DefaultName',
    email: 'Default@ExtraAhorro.tk',
    company: 'ExtraAhorro',
    avatar: 'assets/images/avatars/default.jpg',
    status: 'online'
  };
