import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { TipocambioService } from 'src/app/core/services/tipocambio.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tipocambio-form',
  templateUrl: './tipocambio-form.component.html',
  styleUrls: ['./tipocambio-form.component.scss']
})
export class TipocambioFormComponent implements OnInit {

  form: FormGroup = new FormGroup({ });
  private errores:string [] =[];

  constructor(
    private fb: FormBuilder,
    private tipocambioService:TipocambioService,
    private router:Router
  ) {
    this.buildForm();
    
   }

  ngOnInit(): void {
    //wait
    
  }

  private buildForm(){
    this.form = this.fb.group(
      {
 
        moneda: ['USD',[Validators.required]],
        tcventa:  [(0).toFixed(3),[Validators.required,Validators.min(0.001)]],
        tccompra:  [(0).toFixed(3),[Validators.required,Validators.min(0.001)]],
        idusuario:  [1,[Validators.required]],
        estado: ['S', Validators.required]
      }
    )
    
  }

  saveTipoCambio(event:Event){
    event.preventDefault();
    if(this.form.valid){
      const tipocambiodia = this.form.value;
      this.tipocambioService.createTipoCambioDiario(tipocambiodia)
      .subscribe(
        json => {
          console.log(json)
          this.router.navigate(['/admin/tipocambiodiario'])

          Swal.fire(
            'Nuevo',
            `${json.mensaje}: ${formatDate(json.tipoDeCambio.createAt,'dd-MM-yyyy','en-US')}`,
            'success'
          )
        },
        err=>{
          this.errores = err.error.errors as string[];
          console.error('Codigo de error del backend: '+err.status)
          console.error(err.error.errors)
          
        }
      )
      
    }
  }

  get tcventaField() {
    return this.form.get('tcventa')
  }
  get tccompraField() {
    return this.form.get('tccompra')
  }

}
