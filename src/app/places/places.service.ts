import {Injectable} from '@angular/core';
import {Place} from './place.model';

@Injectable({
    providedIn: 'root'
})
export class PlacesService {
    private _places: Place[] = [
        new Place(
            'p1',
            'Manhattan Mansion',
            'In the heart of New York City.',
            'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg',
            149.99
        ),
        new Place(
            'p2',
            'L\'Amour Toujours',
            'A romantic place in Paris!',
            'https://s-ec.bstatic.com/images/hotel/max1024x768/156/156714710.jpg',
            189.99
        ),
        new Place(
            'p3',
            'The Foggy Palace',
            'Not your average city trip!',
            'https://images.fineartamerica.com/images-medium-large-5/foggy-palace-5-sfphotostore-.jpg',
            99.99
        ),
    ];

    get places() {
        return [...this._places];
    }

    constructor() {}

    getPlace(id: string) {
        return {...this._places.find(p => p.id === id)};
    }
}
