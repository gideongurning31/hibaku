import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpUtilService } from './http-util.service';

@NgModule({
  declarations: [],
  entryComponents: [],
  imports: [CommonModule, HttpClientModule, MatDialogModule],
  providers: [HttpUtilService],
  exports: [],
})
export class UtilsModule {}
