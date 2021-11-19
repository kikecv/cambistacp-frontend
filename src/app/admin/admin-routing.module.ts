import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { TipocambioEditComponent } from './components/tipocambio-edit/tipocambio-edit.component';
import { TipocambioFormComponent } from './components/tipocambio-form/tipocambio-form.component';
import { TipocambioListComponent } from './components/tipocambio-list/tipocambio-list.component';

const routes: Routes = [
  {
    path:'',
    component:NavComponent,
    children:[
      {
        path:'tipocambiodiario',
        component: TipocambioListComponent
      },
      {
        path:'tipocambiodiario/page',
        component: TipocambioListComponent
      },
      {
        path:'tipocambiodiario/create',
        component: TipocambioFormComponent
      },
      {
        path:'tipocambiodiario/edit/:id',
        component: TipocambioEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
