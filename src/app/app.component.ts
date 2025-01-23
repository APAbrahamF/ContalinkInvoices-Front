import { Component, OnInit } from '@angular/core';
import { InvoicesService } from './invoices.service';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'contalink_invoices_front';
  invoices: any[] = [];
  invoicesColumns= [
    'id','invoice_number','total','invoice_date','status'
  ];
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  save() {
    const startDate: string = this.range.value.start
    const endDate: string = this.range.value.end
    this.invoicesService.getPosts(startDate, endDate).subscribe(data => {
      this.invoices = data;
    });
  }
  constructor(private invoicesService: InvoicesService) { }
  ngOnInit(): void {
    this.fetchInvoices();
  }
  fetchInvoices(): void {
    this.range.reset();
    this.invoicesService.getPosts('','').subscribe(data => {
      this.invoices = data;
    });
  }
}
