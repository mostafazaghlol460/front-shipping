import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { BranchesServiceService } from 'src/app/Service/branches-service.service';
import { CitiesServiceService } from 'src/app/Service/cities-service.service';
import { GetAllOrderService } from 'src/app/Service/get-all-order.service';
import { GovernatesServiceService } from 'src/app/Service/governates-service.service';
import { ShippingSettingService } from 'src/app/Service/shipping-setting.service';
import { TraderService } from 'src/app/Service/trader.service';
enum PaymentType {
  PayOnDelivery = 'payOnDelivery',
  Prepaid = 'prepaid',
  PackageForAPackage = 'packageForAPackage'
}
@Component({
  selector: 'app-add-order-for-trader',
  templateUrl: './add-order-for-trader.component.html',
  styleUrls: ['./add-order-for-trader.component.css']
})
export class AddOrderForTraderComponent implements OnInit {
  paymentTypes: PaymentType[] = Object.values(PaymentType);
  paymentType: number = 0;
  cityForm!: FormGroup;
  productControls: FormGroup[] = [];
  id_order: string = '';
  formData: any = {}; // This will store the form data
  isEditMode = false; // Flag to track if the form is in edit mode
  traders: any[] = [];
  governates: any[] = []; // Add your governate data here
  cities: any[] = []; // Add your city data here
  shippingTypes: any[] = []; // Add your shipping type data here
  branches: any[] = []; // Add your branch data here

  constructor(
    private formBuilder: FormBuilder,
    private getAllOrderService: GetAllOrderService,
    private citiesService: CitiesServiceService,
    private governateService: GovernatesServiceService,
    private tradersevice: TraderService,
    private shippingsettingservice: ShippingSettingService,
    private branchesServiceService: BranchesServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id_order = params['id'];
      if (this.id_order) {
        this.isEditMode = true;
        // Call a service method to fetch the order details based on the ID
        this.getAllOrderService
          .GetorderByID(this.id_order)
          .subscribe((data: any) => {
            this.populateForm(data);
          });
      }
      this.createForm();

      this.fetchbranches();
      this.fetchCities();
      this.fetchGovernates();
      this.fetchshipping();
      this.fetchtrader();
    });
  }

  fetchCities() {
    this.citiesService.getCities().subscribe((data: any) => {
      this.cities = data;
    });
  }

  fetchGovernates() {
    this.governateService.getGovernates().subscribe((data: any) => {
      this.governates = data;
    });
  }

  fetchtrader() {
    this.tradersevice.getAllTraders().subscribe((data: any) => {
      this.traders = data;
    });
  }

  fetchbranches() {
    this.branchesServiceService.getBranches().subscribe((data: any) => {
      this.branches = data;
    });
  }

  fetchshipping() {
    this.shippingsettingservice.getShippingSetting().subscribe((data: any) => {
      this.shippingTypes = data;
    });
  }

  createForm(): void {
    this.cityForm = this.formBuilder.group({
      id: this.id_order,
      traderId: this.authService.getId(),
      paymentType: [0, Validators.required],
      clientName: ['', Validators.required],
      firstPhoneNumber: ['', Validators.required],
      secondPhoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      street: ['', Validators.required],
      deliverToVillage: false,
      notes: '',
      isDeleted: false,
      governorateId: ['', Validators.required],
      cityId: ['', Validators.required],
      shippingTypeId: ['', Validators.required],
      branchId: ['', Validators.required],
      products: this.formBuilder.array([])
    });
  }

  get getProductControls(): FormArray {
    return this.cityForm.get('products') as FormArray;
  }

  addProduct(): void {
    const productFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      quantity: [0, Validators.required],
      price: [0, Validators.required],
      weight: [0, Validators.required]
    });
    this.productControls.push(productFormGroup);
    this.getProductControls.push(productFormGroup);
  }

  removeProduct(index: number): void {
    this.productControls.splice(index, 1);
    this.getProductControls.removeAt(index);
  }

  populateForm(data: any): void {
    this.isEditMode = true;
    // Set the form values with the provided data for editing
    this.cityForm.patchValue({
      traderId: data.traderId,
      paymentType: data.paymentType,
      clientName: data.clientName,
      firstPhoneNumber: data.firstPhoneNumber,
      secondPhoneNumber: data.secondPhoneNumber,
      email: data.email,
      address: data.address,
      street: data.street,
      deliverToVillage: data.deliverToVillage,
      notes: data.notes,
      isDeleted: false,
      governorateId: data.governorateId,
      cityId: data.cityId,
      shippingTypeId: data.shippingTypeId,
      branchId: data.branchId
    });

    // Populate the products form array with the existing product data
    const productsArray = this.cityForm.get('products') as FormArray;
    productsArray.clear();
    data.products.forEach((product: any) => {
      const productFormGroup = this.formBuilder.group({
        name: [product.name, Validators.required],
        quantity: [product.quantity, Validators.required],
        price: [product.price, Validators.required],
        weight: [product.weight, Validators.required]
      });
      this.productControls.push(productFormGroup);
      productsArray.push(productFormGroup);
    });
  }

  submitForm(): void {
    if (this.cityForm.invalid) {
      return;
    }
    // Populate the formData object with the form values
    this.formData = this.cityForm.value;

    this.formData.paymentType = Number(this.formData.paymentType);
    if (this.isEditMode) {
      // Call the JSON service method to update the form data
      this.getAllOrderService.updateOrder(this.formData).subscribe(
        (response: any) => {
          this.router.navigate(['/trader/ShowOrder']);
          // Handle success response
          console.log('Form updated successfully:', response);
        },
        (error: any) => {
          // Handle error response
          console.log(this.formData);
          console.error('Error updating form:', error);
        }
      );
    } else {
      // Call the JSON service method to add the form data
      this.formData.paymentType = Number(this.formData.paymentType);
      this.getAllOrderService.AddOrder(this.formData).subscribe(
        (response: any) => {
          this.router.navigate(['/trader/ShowOrder']);

          // Handle success response
          console.log('Form added successfully:', response);
        },
        (error: any) => {
          // Handle error response
          console.log(this.formData);
          console.error('Error adding form:', error);
        }
      );
    }
  }

  getProductControl(index: number): FormGroup {
    return this.productControls[index];
  }
}
