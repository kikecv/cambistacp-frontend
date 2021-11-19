import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TipocambioService } from 'src/app/core/services/tipocambio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipocambio-edit',
  templateUrl: './tipocambio-edit.component.html',
  styleUrls: ['./tipocambio-edit.component.scss']
})
export class TipocambioEditComponent implements OnInit {

  form: FormGroup = new FormGroup({})
  id : number = 0
  private errores:string [] =[];

  constructor(
    private fb: FormBuilder,
    private tipocambioService:TipocambioService,
    private router : Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.buildForm()
  }

  ngOnInit(): void {
      this.activatedRoute.params.subscribe(
        (params:Params) =>{
          this.id = params.id
          this.tipocambioService.getTipoCambio(this.id)
          .subscribe(
            tc => {
              this.form.patchValue(tc)
            }
          )

        }
      )

  }

  private buildForm(){
    this.form = this.fb.group(
      {
        id: [0, Validators.required],
        moneda: ['USD',[Validators.required]],
        tcventa:  [0,[Validators.required]],
        tccompra:  [0,[Validators.required]],
        idusuario:  [1,[Validators.required]],
        estado: ['S', Validators.required]
      }
    )
  }

  saveTipoCambio(event:Event){
    event.preventDefault();
    if(this.form.valid){
      const tipocambiodia = this.form.value;
      this.tipocambioService.updateTipoCambioDiario(this.id,tipocambiodia)
      .subscribe(
        json => {
          console.log(json)
          this.router.navigate(['/admin/tipocambiodiario'])
          Swal.fire(
            'Editar',
            `${json.mensaje}: ${formatDate(json.tipoDeCambio.createAt,'dd-MM-yyyy','en-US')}`,
            'success'
          )
        },
        err=>{
          this.errores = err.errors as string[];
          console.error('Codigo de error del backend: '+err.status)
          console.error(err.errors)
          
        }
      )
      
    }
  }

}
