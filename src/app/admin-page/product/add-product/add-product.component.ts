import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { CategoryService } from 'src/app/_services/category.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  link = 'assets\\image\\thumbnail\\';
  myimage: Observable<any>;
  imageSrc: any;
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  seletedValue = '';
  product = {
    id: -1,
    nameProduct: '',
    giaBanRa: '',
    base64: '',
    nameImage: '',
    categoryCode: '',
    describe: '',
  };
  categorys: any;
  isUpdate: any;
  isCreate: any;
  updateProduct: any;
  title: any;

  formErrors = {
    productName: '',
    category: '',
    price: '',
    describe: '',
    Image: '',
  };
  validationMessages = {
    productName: {
      required: 'Product Name is required.',
    },
    category: {
      required: 'Category is required.',
    },
    price: {
      required: 'Price is required.',
    },
    describe: {
      required: 'Descripe  is required.',
    },
    Image: {
      required: 'file is required',
    },
  };

  isCreateOrUpdate: number;

  productForm: FormGroup;

  constructor(
    private router: Router,
    public categoryService: CategoryService,
    private fb: FormBuilder,
    public productService: ProductService,
    private activateRout: ActivatedRoute
  ) {
    this.readCategory();
    this.activateRout.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id != null) {
        this.title = 'Update Product';
        this.isCreateOrUpdate = parseInt(id);
      } else {
        this.isCreateOrUpdate = null;
      }
    });
  }

  ngOnInit(): void {
    if (this.isCreateOrUpdate != null) {
      this.productForm = this.fb.group({
        productName: ['', [Validators.required]],
        category: ['', [Validators.required]],
        price: ['', [Validators.required]],
        describe: ['', [Validators.required]],
    

      });
      this.productForm.valueChanges.subscribe(() => {
        this.logKeyValuePairs(this.productForm);
      });
      if (this.isCreateOrUpdate != null) {
        this.showDetaileProduct(this.isCreateOrUpdate, this.productForm);
      }
    } else {
      this.productForm = this.fb.group({
        productName: ['', [Validators.required]],
        category: ['', [Validators.required]],
        price: ['', [Validators.required]],
        describe: ['', [Validators.required]],
        Image: ['', [Validators.required]],
      });
      this.productForm.valueChanges.subscribe(() => {
        this.logKeyValuePairs(this.productForm);
      });
    }
  }

  readCategory() {
    this.categoryService.readAllCategory().subscribe((res) => {
      this.categorys = res;
    });
  }
  logKeyValuePairs(group: FormGroup = this.productForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      if (
        abstractControl &&
        !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty)
      ) {
        const messages = this.validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }
      if (abstractControl instanceof FormGroup) {
        this.logKeyValuePairs(abstractControl);
      }
    });
  }
  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.selectedFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result);
      reader.readAsDataURL(file);
    }
  }

  onChange($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0];
    this.convertToBase64(file);
  }

  convertToBase64(file: File) {
    this.myimage = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }

  insertProduct() {
    if (this.isCreateOrUpdate === null) {
      if (this.productForm.invalid) {
        this.productForm.markAllAsTouched();
        this.logKeyValuePairs(this.productForm);
      } else {
        this.convertToBase64(this.selectedFile);
        this.myimage.subscribe((res) => {
          this.product.base64 = res;
          this.product.nameImage = this.selectedFile.name;
          this.product.base64.toString();
          this.product.nameProduct = this.productForm.get('productName').value;
          this.product.categoryCode = this.productForm.get('category').value;
          this.product.giaBanRa = this.productForm.get('price').value;
          this.product.describe = this.productForm.get('describe').value;
          this.productService.insertProduct(this.product).subscribe((res) => {
              if(res) {
                this.router.navigateByUrl('/admin');
              }
          });
         
        });
      }
    } else {
      if (this.productForm.invalid) {
        this.productForm.markAllAsTouched();
        this.logKeyValuePairs(this.productForm);
      } else {
        if (this.selectedFile == undefined) {
          this.product.base64 = null;
          this.product.nameProduct = this.productForm.get('productName').value;
          this.product.giaBanRa = this.productForm.get('price').value;
          this.product.categoryCode = this.productForm.get('category').value;
          this.product.describe = this.productForm.get('describe').value;
          this.productService
            .updateProduct(this.isCreateOrUpdate, this.product)
            .subscribe((res) => {
              this.router.navigateByUrl('/admin');
            });

        } else {
          this.convertToBase64(this.selectedFile);
          this.myimage.subscribe((res) => {
            this.product.base64 = res;
            this.product.nameImage = this.selectedFile.name;
            this.product.base64.toString();
            this.product.nameProduct = this.productForm.get(
              'productName'
            ).value;
            this.product.categoryCode = this.productForm.get('category').value;
            this.product.giaBanRa = this.productForm.get('price').value;
            this.productService
              .updateProduct(this.isCreateOrUpdate, this.product)
              .subscribe(() => {
                this.router.navigateByUrl('/admin');
              });

          });
        }
      }
    }
  }
  back() {
    this.router.navigateByUrl('product');
  }

  showDetaileProduct(id: Number, form: FormGroup) {
    this.productService.getById(id).subscribe((res) => {
      console.log(res);
      form.get('productName').setValue(res.nameProduct);
      form.get('price').setValue(res.giaBanRa);
      form.get('describe').setValue(res.describe);
      form.get('category').setValue(res.category);
      for (let category of this.categorys) {
        if (category.code === res.category?.code) {
          form.get('category').setValue(category.code);
        }
      }
    });
  }
}
