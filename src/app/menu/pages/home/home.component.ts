import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'hibaku-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  menu: Array<MainIcon>;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.menu = [
      { title: 'Transaksi Hibah dengan Optimasi', name: 'Transaksi', route: 'transaksi' },
      { title: 'Pengaturan Komoditas HIBAKU', name: 'Komoditas', route: 'komoditas' },
      { title: 'Manajemen Pasokan & Permintaan', name: 'Supply / Demand', route: 'supply-demand' },
      { title: 'Manajemen & Registrasi Akun User', name: 'Registrasi User', route: 'registrasi-penerima' },
    ];
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}

interface MainIcon {
  title: string;
  name: string;
  route: string;
}
