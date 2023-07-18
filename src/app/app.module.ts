import { updateEmployee } from 'src/app/models/IEmployee';
import { GetTradersComponent } from './Components/get-traders/get-traders.component';
import { AddSpecialPriceComponent } from './Components/add-special-price/add-special-price.component';
import { GetAllRepresentiveComponent } from './Components/get-all-representive/get-all-representive.component';
import { AddRepresentiveComponent } from './Components/add-representive/add-representive.component';
import { UpdateRepresentativeComponent } from './Components/update-representive/update-representive.component';

// Importing the pagination module for the application.
// import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GovernatesComponent } from './Components/governates/governates.component';
import { CitiesComponent } from './Components/cities/cities.component';
import { BranchesComponent } from './Components/branches/branches.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddGovernateComponent } from './Components/add-governate/add-governate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCityComponent } from './Components/add-city/add-city.component';
import { AddBranchComponent } from './Components/add-branch/add-branch.component';
import { GetSpecialPriceComponent } from './Components/get-special-price/get-special-price.component';
import { AddTraderComponent } from './Components/add-trader/add-trader.component';
import { UpdateTraderComponent } from './Components/update-trader/update-trader.component';
import { EmployeeComponent } from './Components/employee/employee.component';
import { UpdateEmployeeComponent } from './Components/update-employee/update-employee.component';
import { AddEmployeeComponent } from './Components/add-employee/add-employee.component';
import { WeightSettingComponent } from './Components/weight-setting/weight-setting.component';

import { VillageSettingComponent } from './Components/village-setting/village-setting.component';
import { LoginComponent } from './Components/login/login.component';

import { ShippingSettingComponent } from './Components/shipping-setting/shipping-setting.component';
import { AddShippingSettingComponent } from './Components/add-shipping-setting/add-shipping-setting.component';
import { ToastrComponentlessModule, ToastrModule, ToastrService } from 'ngx-toastr';
import { LayoutComponent } from './Components/layout/layout.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { NavbarComponent } from './Components/navbar copy/navbar.component';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';

import { SearchPipe } from './search.pipe';
import { SearchidintityPipe } from './searchidintity.pipe';



import { ReportShippingComponent } from './Components/report-shipping/report-shipping.component';
import { ShowOrderComponent } from './Components/show-order/show-order.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddOrderComponent } from './Components/add-order/add-order.component';
import { StatusUpdateComponent } from './Components/status-update/status-update.component';
import { AlertComponent } from './Components/alert/alert.component';
import { HomeComponent } from './Components/home/home.component';
import { HomeForTraderComponent } from './Components/home-for-trader/home-for-trader.component';
import { TokenInterceptor } from 'src/interceptors/token.interceptor';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ShoworderForTraderComponent } from './Components/showorder-for-trader/showorder-for-trader.component';
import { AddOrderForTraderComponent } from './Components/add-order-for-trader/add-order-for-trader.component';


@NgModule({
  declarations: [
    AppComponent,
    GovernatesComponent,
    CitiesComponent,
    BranchesComponent,
    AddGovernateComponent,
    AddCityComponent,
    AddBranchComponent,
    UpdateRepresentativeComponent,
    AddRepresentiveComponent,
    GetAllRepresentiveComponent,
    GetSpecialPriceComponent,
    AddSpecialPriceComponent,
    GetTradersComponent,
    AddTraderComponent,
    UpdateTraderComponent,
    EmployeeComponent,
    UpdateEmployeeComponent,
    AddEmployeeComponent,
    WeightSettingComponent,
    AddOrderComponent,
    ShowOrderComponent,
    StatusUpdateComponent,
    VillageSettingComponent,
    LoginComponent,

    ShippingSettingComponent,
    AddShippingSettingComponent,
    LayoutComponent,
    SidebarComponent,
    NavbarComponent,
    VillageSettingComponent,
    SearchPipe,
    SearchidintityPipe,
    ReportShippingComponent,
    ShowOrderComponent,
    AlertComponent,
    HomeComponent,
    HomeForTraderComponent,
    DashboardComponent,
    ShoworderForTraderComponent,
    AddOrderForTraderComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgbCollapse,
    NgxPaginationModule,

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi:true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
