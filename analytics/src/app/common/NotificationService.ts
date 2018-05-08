import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

export interface NotifyEvent {
    eventId: string;
    value: {};
    values: any[];
}

@Injectable()
export class NotificationService {
    static eventSubject: BehaviorSubject<NotifyEvent>= <BehaviorSubject<NotifyEvent>>new BehaviorSubject(undefined);

    constructor() {
        console.log ("NotificationService()")
    }

    addObserver() {
        console.log ("addObserver()");
        return NotificationService.eventSubject.asObservable(); 
    }


    addEvent(eventItem: NotifyEvent) {
        console.log ("addEvent()", eventItem);
        NotificationService.eventSubject.next(eventItem);
    }

}