import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [],
  imports: [CommonModule, MatButtonModule, MatCardModule, MatInputModule],
  exports: [MatButtonModule, MatCardModule, MatInputModule],
})
export class MaterialModule {}
