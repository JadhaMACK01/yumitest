import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Feed } from './feed';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private subject: Subject<Feed> = new Subject<Feed>();

  private pusherClient: Pusher;

  constructor() {
    this.pusherClient = new Pusher('149aad51dffc275c62ba', { cluster: 'ap4' });

    const channel = this.pusherClient.subscribe('realtime-feeds');

    channel.bind(
      'posts',
      (data: { title: string; body: string; time: string }) => {
        this.subject.next(new Feed(data.title, data.body, new Date(data.time)));
      }
    );
  }

  getFeedItems(): Observable<Feed> {
    return this.subject.asObservable();
  }
}
