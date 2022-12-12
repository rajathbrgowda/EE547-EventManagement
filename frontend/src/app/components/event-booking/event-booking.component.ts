import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-booking',
  templateUrl: './event-booking.component.html',
  styleUrls: ['./event-booking.component.css'],
})
export class EventBookingComponent implements OnInit {
  showBookings: boolean = false;

  constructor() {}
  ngOnInit(): void {}

  public searchBookings() {
    this.showBookings = true;
  }

  public goBackToSearchForm() {
    this.showBookings = false;
  }
}
