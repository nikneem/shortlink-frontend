import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatTableModule,
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatTableModule,
  ],
})
export class MaterialModule {}
