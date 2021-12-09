import {Injectable, OnDestroy, OnInit} from '@angular/core'
import {BehaviorSubject, fromEvent, merge, Observable, of, Subject, Subscription} from 'rxjs'
import {map} from 'rxjs/operators'

@Injectable()
export class AppOfflineService implements OnInit, OnDestroy {
  private _onlineStatus: Subject<boolean> = new BehaviorSubject(true)
  onConnectionChange: Observable<boolean> = this._onlineStatus.asObservable()

  private onlineStatusObservable: Observable<boolean>
  private onlineStatusObservableSub: Subscription
  private isConnected: boolean

  /**
   * Returns the current connection status.<br/>
   * To get notification when connection changes occur use the subscription:<br/>
   * <pre>
   onlineStatus.subscribe((connected) => {
          console.log('connected:', connected)
      })
   * </pre>
   *
   */
  public get connected() {
    return this.isConnected
  }

  constructor() {
  }

  ngOnInit(): void {
    this.onlineStatusObservable = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(map(() => true)),
      fromEvent(window, 'offline').pipe(map(() => false)))

    this.onlineStatusObservableSub = this.onlineStatusObservable.subscribe(connected => {
      this.isConnected = connected
      this._onlineStatus.next(connected)
    })
  }

  ngOnDestroy(): void {
    if (this.onlineStatusObservableSub) {
      this.onlineStatusObservableSub.unsubscribe()
    }
  }
}