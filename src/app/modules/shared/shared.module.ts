import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveLinkDirective } from './directives/active-link.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ActiveLinkDirective],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  exports: [
    ActiveLinkDirective,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
})
export class SharedModule {}
