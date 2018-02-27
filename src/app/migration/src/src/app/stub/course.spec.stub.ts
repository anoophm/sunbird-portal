import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class CourseStub {
  mockRes = {
    'err': null,
    'enrolledCourses': {
      '0': {
        'active': 'true', 'courseId': 'do_2123412199319552001265', 'courseName': '27-sept',
        'description': 'test', 'leafNodesCount': '0', 'progress': '0', 'userId': 'd5efd1ab-3cad-4034-8143-32c480f5cc9e'
      }
    }
  };
  private _courseData$ = new BehaviorSubject<any>(this.mockRes);
  public readonly courseData$: Observable<any> = this._courseData$.asObservable();
}