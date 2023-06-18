import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

}
