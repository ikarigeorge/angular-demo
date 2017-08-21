import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { ENV } from './env.conf';
import { EventModel } from './models/event.model';
import { RsvpModel } from './models/rsvp.model';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient) { }

  // GET list of public, future events
  getEvents$(): Observable<EventModel[]> {
    return this.http
      .get(`${ENV.BASE_API}events`)
      .catch(this._handleError);
  }

  // GET all events - private and public (admin only)
  getAdminEvents$(): Observable<EventModel[]> {
    return this.http
      .get(`${ENV.BASE_API}events/admin`)
      .catch(this._handleError);
  }

  // GET an event by ID (login required)
  getEventById$(id: string): Observable<EventModel> {
    return this.http
      .get(`${ENV.BASE_API}event/${id}`)
      .catch(this._handleError);
  }

  // GET RSVPs by event ID (login required)
  getRsvpsByEventId$(eventId: string): Observable<RsvpModel[]> {
    return this.http
      .get(`${ENV.BASE_API}event/${eventId}/rsvps`)
      .catch(this._handleError);
  }

  private _handleError(err: HttpErrorResponse | any) {
    const errorMsg = err.message || 'Error: Unable to complete request.';
    return Observable.throw(errorMsg);
  }

}