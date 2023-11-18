import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveLinkDirective } from './directives/active-link.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ContentLoaderModule } from '@ngneat/content-loader';

@NgModule({
  declarations: [ActiveLinkDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ContentLoaderModule,
  ],
  exports: [
    ActiveLinkDirective,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ContentLoaderModule,
  ],
})
export class SharedModule {}
