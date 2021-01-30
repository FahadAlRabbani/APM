import { ProductService } from './product.service';
import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  imageWidth: number;
  imageMargin: number;
  showImage: boolean;

  filteredProducts: IProduct[];
  products: IProduct[];

  _listFilter = '';

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }


  public toggleImage(): void {
    this.showImage = !this.showImage;
  }

  constructor(private productService: ProductService) {

    this.imageWidth = 50;
    this.imageMargin = 2;
    this.showImage = false;
    this.listFilter = '';

  }

  ngOnInit(): void {
    console.log('OnInit executed.');
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.filteredProducts = this.products;
        this.pageTitle = this.products.length > 0 ? 'Product List' : 'No products';
      },
      error => console.log(error));

  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter(
      (product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  onRatingClick(message: string): void {
    this.pageTitle = 'Product List:' + message;
  }
}
