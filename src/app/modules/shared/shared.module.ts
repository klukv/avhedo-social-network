import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveLinkDirective } from './directives/active-link.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { LodaerSpinV2Component } from 'src/app/components/loading/lodaer-spin-v2/lodaer-spin-v2.component';
import { LodaerSpinV1Component } from 'src/app/components/loading/lodaer-spin-v1/lodaer-spin-v1.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ContentLoaderModule,
  ],
  declarations: [
    ActiveLinkDirective,
    LodaerSpinV2Component,
    LodaerSpinV1Component,
  ],
  exports: [
    ActiveLinkDirective,
    LodaerSpinV2Component,
    LodaerSpinV1Component,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ContentLoaderModule,
  ],
})
export class SharedModule {}
