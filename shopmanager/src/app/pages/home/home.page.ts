import { element } from 'protractor';
import { Component, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  carddata: any;
  @Input('header') header: any;
  constructor(private renderer: Renderer2) {
    this.carddata = [
      {
        'id': 1,
        'title': 'Stock Items',
        'icon': 'list',
        'color': '#ff7b84',
        'route': 'items'
      },
      {
        'id': 2,
        'title': 'Store Master',
        'icon': 'storefront',
        'color': '#2196f3',
        'route': 'store-master'
      },
      {
        'id': 3,
        'title': 'Transactions Area',
        'icon': 'repeat',
        'color': '#ae60d5',
        'route': 'transactions'
      },
      {
        'id': 4,
        'title': 'Sales',
        'icon': 'clipboard',
        'color': '#0c549b',
        'route': 'sales'
      },
      {
        'id': 5,
        'title': 'Landline',
        'icon': 'basket',
        'color': '#e7b871'
      },
      {
        'id': 6,
        'title': 'Stock Item Entry',
        'icon': 'basket',
        'color': '#4dd162'
      },
      {
        'id': 7,
        'title': 'Mobile',
        'icon': 'call',
        'color': '#2196f3'
      },
      {
        'id': 8,
        'title': 'Landline',
        'icon': 'basket',
        'color': '#596fec'
      },
      {
        'id': 9,
        'title': 'Stock Item Entry',
        'icon': 'basket',
        'color': '#ff7b84'
      },
      {
        'id': 10,
        'title': 'Mobile',
        'icon': 'call',
        'color': '#f0c30f'
      },
      {
        'id': 11,
        'title': 'Landline',
        'icon': 'basket',
        'color': '#0b9f8e'
      },
      {
        'id': 12,
        'title': 'Stock Item Entry',
        'icon': 'basket',
        'color': 'ff7b84'
      }
    ]
  }

  ngOnInit() {
  }

  lastX: any;
  logScrolling(event) {
    if (event.detail.scrollTop > Math.max(0, this.lastX)) {
      this.renderer.setStyle(this.header, 'height', '10%');
    }
    else {
      this.renderer.setStyle(this.header, 'height', '20%');
    }
    this.lastX = event.detail.scrollTop;
  }

  scrollStart(header) {
    this.header = header.el;
  }

}
