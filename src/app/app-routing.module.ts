import { ShowOrderComponent } from './Components/show-order/show-order.component';
import { ReportShippingComponent } from './Components/report-shipping/report-shipping.component';
import { AddSpecialPriceComponent } from './Components/add-special-price/add-special-price.component';
import { GetSpecialPriceComponent } from './Components/get-special-price/get-special-price.component';
import { UpdateTraderComponent } from './Components/update-trader/update-trader.component';
import { AddTraderComponent } from './Components/add-trader/add-trader.component';
import { GetTradersComponent } from './Components/get-traders/get-traders.component';
import { UpdateRepresentativeComponent } from './Components/update-representive/update-representive.component';
import { AddRepresentiveComponent } from './Components/add-representive/add-representive.component';
import { GetAllRepresentiveComponent } from './Components/get-all-representive/get-all-representive.component';
import { AddBranchComponent } from './Components/add-branch/add-branch.component';
import { BranchesComponent } from './Components/branches/branches.component';
import { AddCityComponent } from './Components/add-city/add-city.component';
import { CitiesComponent } from './Components/cities/cities.component';
import { GovernatesComponent } from './Components/governates/governates.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGovernateComponent } from './Components/add-governate/add-governate.component';
import { EmployeeComponent } from './Components/employee/employee.component';
import { AddEmployeeComponent } from './Components/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './Components/update-employee/update-employee.component';
import { WeightSettingComponent } from './Components/weight-setting/weight-setting.component';

import { LoginComponent } from './Components/login/login.component';

import { ShippingSettingComponent } from './Components/shipping-setting/shipping-setting.component';
import { AddShippingSettingComponent } from './Components/add-shipping-setting/add-shipping-setting.component';
import { VillageSettingComponent } from './Components/village-setting/village-setting.component';
import { StatusUpdateComponent } from './Components/status-update/status-update.component';
import { AddOrderComponent } from './Components/add-order/add-order.component';
import { HomeComponent } from './Components/home/home.component';
import { HomeForTraderComponent } from './Components/home-for-trader/home-for-trader.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LoginGuard } from 'src/guards/login.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { EmployeeGuard } from 'src/guards/employee.guard';
import { TraderGuard } from 'src/guards/trader.guard';
import { ShoworderForTraderComponent } from './Components/showorder-for-trader/showorder-for-trader.component';
import { AddOrderForTraderComponent } from './Components/add-order-for-trader/add-order-for-trader.component';

const routes: Routes = [
  // Default route
  { path: 'login', component: LoginComponent ,canActivate:[LoginGuard]},

  // Default route
  {path:'',component:DashboardComponent,
  children:[
    {path:'trader',children:[
      {path: 'home', component: HomeForTraderComponent },
      {path: 'ShowOrder', component: ShoworderForTraderComponent },
      { path: 'addorder', component:AddOrderForTraderComponent },
      { path: 'updateorder/:id', component: AddOrderForTraderComponent}
    ],canActivate:[TraderGuard]},
    {path:'employee',children:[
      { path: 'home', component: HomeComponent },

      { path: 'getAllRepresentive', component: GetAllRepresentiveComponent },

    { path: 'addRepresentive', component: AddRepresentiveComponent },
    { path: 'UpdateRepresentive/:id', component: UpdateRepresentativeComponent },
    // Route for adding a Branch
    { path: 'get-Branches', component: BranchesComponent },
    { path: 'add-branch', component: AddBranchComponent },
    { path: 'add-branch/:id', component: AddBranchComponent },
    // Route for adding a Cities
    { path: 'get-Cities', component: CitiesComponent },
    { path: 'add-city', component: AddCityComponent },
    { path: 'add-city/:id', component: AddCityComponent },

    //path for employee
    // { path: 'getAllemployee', component: EmployeeComponent },
    { path: 'getAllEmployee', component: EmployeeComponent },
    { path: 'addemployee', component: AddEmployeeComponent },
    { path: 'UpdateEmployee/:id', component: UpdateEmployeeComponent },

    // Route for getting governates
    { path: 'get-governate', component: GovernatesComponent },

    { path: 'add-governate', component: AddGovernateComponent },

    { path: 'update-governate/:id', component: AddGovernateComponent },

    // Route for weight_setting
    { path: 'setting/weight_setting', component: WeightSettingComponent },

    // route for shipping setting
    { path: 'setting/getShippingSetting', component: ShippingSettingComponent },

    { path: 'setting/add-ShippingSetting', component: AddShippingSettingComponent },

    { path: 'setting/update-ShippingSetting/:id', component: AddShippingSettingComponent },

    // route for shipping setting
    { path: 'setting/getVillageSetting', component: VillageSettingComponent },

    { path: 'setting/add-Village', component: VillageSettingComponent },

    { path: 'setting/update-Village/:id', component: VillageSettingComponent },
    { path: 'setting', redirectTo: "setting/weight_setting"},

    { path: 'addorder', component: AddOrderComponent },
    //aya routing
    { path: 'get-traders', component: GetTradersComponent },

    { path: 'add-trader', component: AddTraderComponent },

    { path: 'update-trader/:id', component: UpdateTraderComponent },

    { path: 'get-sp', component: GetSpecialPriceComponent },

    { path: 'add-sp', component: AddSpecialPriceComponent },

    //report
    { path: 'ReportShipping', component: ReportShippingComponent },
    { path: 'ShowOrder', component: ShowOrderComponent },
    { path: 'StatusUpdate/:id', component: StatusUpdateComponent },
    ],canActivate:[EmployeeGuard]},
  ],canActivate:[AuthGuard]}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
