import {Component, OnInit} from '@angular/core';
import {BookingsService} from "./bookings.service";
import {Booking} from "./booking.model";
import {IonItemSliding} from "@ionic/angular";

@Component({
    selector: 'app-bookings',
    templateUrl: './bookings.page.html',
    styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
    loadedBookings: Booking[];

    constructor(private bookingService: BookingsService) {
    }

    ngOnInit() {
        this.loadedBookings = this.bookingService.bookings;
    }


    onCancelBooking(id: string, slidingEl: IonItemSliding) {
        slidingEl.close();
        // cancel booking with id offerId
    }
}
