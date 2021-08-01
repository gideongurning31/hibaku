import { Menu } from './dashboard.component';

export const allMenu: Array<Menu> = [
  { name: 'Beranda', icon: 'fa-home', route: '', admin: false },
  { name: 'Transaksi', icon: 'fa-handshake-o', route: 'transaksi', admin: true },
  { name: 'Komoditas', icon: 'fa-shopping-basket', route: 'komoditas', admin: true },
  { name: 'Supply / Demand', icon: 'fa-cart-plus', route: 'supply-demand', admin: false },
  { name: 'Registrasi User', icon: 'fa-id-card-o', route: 'registrasi-penerima', admin: true },
];
