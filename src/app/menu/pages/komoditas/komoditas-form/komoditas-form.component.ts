import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { KeyValue } from '@angular/common';
import { Subscription } from 'rxjs';
import { BaseFormComponent } from 'src/app/utils/component/base-form.component';
import { SpinnerCloakService } from 'src/app/utils/component/spinner-cloak/spinner-cloak.service';
import { CommodityService, Commodity } from 'src/app/menu/service/commodity.service';
import { ActionType } from 'src/app/utils/model/ActionType.enum';

@Component({
  selector: 'hibaku-komoditas-form',
  templateUrl: './komoditas-form.component.html',
  styleUrls: ['./komoditas-form.component.scss'],
})
export class KomoditasFormComponent extends BaseFormComponent implements OnInit {
  form: FormGroup;
  successSubmit: EventEmitter<void> = new EventEmitter();
  categories: Array<KeyValue<string, string>>;
  isDeleteForm: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CommodityInject,
    public dialogRef: MatDialogRef<KomoditasFormComponent>,
    private service: CommodityService,
    dialog: MatDialog,
    spinner: SpinnerCloakService) {
      super(dialog, spinner);
  }

  ngOnInit(): void {
    this.initForm();
    this.initFormValue();
  }

  initForm() {
    this.initCategories();
    this.form = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      unit: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
    });
  }

  initCategories() {
    this.categories = [
      { key: 'Jenis A', value: 'A' },
      { key: 'Jenis B', value: 'B' },
      { key: 'Jenis C', value: 'C' },
    ];
  }

  initFormValue() {
    this.isDeleteForm = this.data.type === ActionType.DELETE;
    if (this.data.type !== ActionType.CREATE) {
      Object.keys(this.data.commodity).forEach(key => {
        this.form.get(key).setValue(this.data.commodity[key]);
        if (this.isDeleteForm) {
          this.form.get(key).disable();
        }
      });
    }
  }

  submit() {
    this.setSpinner(true);
    const subscription: Subscription = this.service.submit(this.form.value, this.data.type)
      .subscribe(() => {
        this.close();
        this.okResponse(subscription, 'Perubahan data Komoditas HIBAKU berhasil.');
        this.successSubmit.emit();
      }, err => this.onErrorResponse(subscription, err));
  }

  close() {
    this.form.reset();
    this.dialogRef.close();
  }
}

export interface CommodityInject {
  type: ActionType;
  commodity?: Commodity;
}
