import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StateService {
    private StateSubject = new BehaviorSubject<StateInterface>({isHeaderRefreshNeeded: false});

    $state = this.StateSubject.asObservable();

    updateValue(val): void {
        this.StateSubject.next(val);
    }
}
interface StateInterface {
    isHeaderRefreshNeeded: boolean;
}