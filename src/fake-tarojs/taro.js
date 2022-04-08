import axios from "axios";
import Swal2 from 'sweetalert2';
import path from 'path-browserify';
import qs from 'qs';

class History {
  constructor() {
    this.stack = ["/pages/index/index"];
    this.observers = [];
  }

  push(page) {
    this.stack.push(path.resolve(this.getCurrentPage(), page));
  }

  replace(page) {
    this.stack.pop();
    this.stack.push(path.resolve(this.getCurrentPage(), page));
  }

  pop() {
    if (this.stack.length > 1) {
      this.stack.pop();
    }
  }

  isBase() {
    return this.stack.length === 1;
  }

  getCurrentPage() {
    return this.stack[this.stack.length - 1];
  }

  update() {
    this.observers.forEach(callback => callback());
  }

  observe(callback) {
    this.observers.push(callback);
  }

  unobserve(callback) {
    this.observers = this.observers.filter(item => item !== callback);
  }
}

export const history = new History();

export function navigateTo({ url }) {
  console.log('navigateTo', url);
  history.push(url);
  history.update();
}

export function redirectTo({ url, success }) {
  console.log('redirectTo', url);
  history.replace(url);
  history.update();
  success?.();
}

export function navigateBack(delta = 1) {
  console.log('navigateBack', delta);
  for (let i = 0; i < delta; i++) {
    history.pop();
  }
  history.update();
}

export function request({ method, url, header, data }) {
  console.log('request', method, url, data);
  return axios.request({
    method,
    url: method === 'GET' ? `${url}?${qs.stringify(data)}` : url,
    headers: {
      ...header,
      'Access-Control-Allow-Origin': '*',
    },
    data: method === 'POST' ?
      (header['Content-Type'] === 'application/json' ? data : data)
      : null,
  });
}

export function removeStorageSync(key) {
  console.log('removeStorageSync', key);
  return localStorage.removeItem(key);
}

export function setStorageSync(key, data) {
  console.log('setStorageSync', key, data);
  return localStorage.setItem(key, data);
}

export function getStorageSync(key) {
  console.log('getStorageSync', key);
  return localStorage.getItem(key);
}

export function showToast({ title, duration = 1000, success, icon }) {
  Swal2.fire({
    text: title,
    timer: duration,
    showConfirmButton: false,
    showCancelButton: false,
    icon: icon === 'success' ? 'success' : null
  }).then(() => success?.());
}

export function showModal({
  title,
  content,
  showCancel = true,
  cancelText = '取消',
  cancelColor,
  confirmText = '确定',
  confirmColor,
  success,
}) {
  return Swal2.fire({
    title,
    text: content,
    showCancelButton: showCancel,
    cancelButtonText: cancelText,
    cancelButtonColor: cancelColor,
    confirmButtonText: confirmText,
    confirmButtonColor: confirmColor,
  }).then(({ isConfirmed, isDismissed }) => success?.({
    confirm: isConfirmed,
    cancel: isDismissed,
    errMsg: ''
  }));
}

export function pxTransform(px) {
  return px * window.devicePixelRatio
}

export function reLaunch() {
  window.location.reload();
}

export const hooks = {
  setTitle: null
}

export function setNavigationBarTitle({ title, complete, success }) {
  hooks.setTitle?.(title)
  complete?.()
  success?.()
}

export default {
  navigateTo,
  redirectTo,
  navigateBack,
  request,
  removeStorageSync,
  setStorageSync,
  getStorageSync,
  showToast,
  showModal,
  pxTransform,
  reLaunch,
  setNavigationBarTitle,
};
