import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Tipocambio } from 'src/app/core/models/tipocambio.model';
import { TipocambioService } from 'src/app/core/services/tipocambio.service';


@Component({
  selector: 'app-tipocambio-list',
  templateUrl: './tipocambio-list.component.html',
  styleUrls: ['./tipocambio-list.component.scss']
})
export class TipocambioListComponent implements OnInit {

  tipocambiodiario: Tipocambio []= [];
  displayedColumns: string[] = ['id', 'moneda', 'tcventa', 'tccompra', 'idusuario','estado', 'createAt','actions'];

  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  
  dataSource!: MatTableDataSource<Tipocambio>;
  
  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;
  

  constructor(
    private tipocambioService: TipocambioService
  ) { }

  ngOnInit(): void {
    
    this.fetchTipoCambio(this.pageNumber,this.pageSize);
  }

  fetchTipoCambio(page:number,size:number){
    this.tipocambioService.getAllTipoCambioDiario(page,size)
    .subscribe(
      tipocambiodiario =>{
        let res = tipocambiodiario.content as Tipocambio[];
        this.pageSize = tipocambiodiario.size;
        this.totalElements = tipocambiodiario.totalElements;
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        
      }
    )
  }
  
  findMore(e: any){
    this.tipocambioService.getAllTipoCambioDiario(e.pageIndex,e.pageSize)
    .subscribe(
      tipocambiodiario =>{
        let res = tipocambiodiario.content as Tipocambio[];
        this.pageSize = tipocambiodiario.size;
        this.totalElements = tipocambiodiario.totalElements;
        this.dataSource=new MatTableDataSource(res);


      }
    )
  }



}
