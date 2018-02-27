import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class UserStub {
    mockRes =  { 'err': null , 'userProfile': { 'completeness': 94, 'missingFields': ['dob'] } };
    private _userData$ = new BehaviorSubject<any>(this.mockRes);
  public readonly userData$: Observable<any> = this._userData$.asObservable();

}

