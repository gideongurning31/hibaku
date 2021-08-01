import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SupplyDemand } from 'src/app/menu/service/commodity-service';

@Component({
  selector: 'hibaku-transaction-input',
  templateUrl: './transaction-input.component.html',
  styleUrls: ['./transaction-input.component.scss'],
})
export class TransactionInputComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: SupplyDemand) {}

  ngOnInit(): void {
    console.log(this.data);
  }

}
