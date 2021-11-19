import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '../material/material.module';
import { TipocambioListComponent } from './components/tipocambio-list/tipocambio-list.component';
import { TipocambioFormComponent } from './components/tipocambio-form/tipocambio-form.component';

import { ReactiveFormsModule } from '@angular/forms';
import { TipocambioEditComponent } from './components/tipocambio-edit/tipocambio-edit.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [NavComponent, TipocambioListComponent, TipocambioFormComponent, TipocambioEditComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AdminModule { }
