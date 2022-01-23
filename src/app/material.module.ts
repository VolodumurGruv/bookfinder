import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [MatIconModule, MatInputModule, MatFormFieldModule, MatSelectModule],
  exports: [MatIconModule, MatInputModule, MatSelectModule],
})
export class MaterialModule {}
