import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';

describe('UserService', () => {
  let service: UserService;
  let controller:HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers:[UserService]
    });
    service = TestBed.inject(UserService);
    controller = TestBed.inject(HttpTestingController)
  });

  // spec-1 --working
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // spec-2 --working
  it('getData return 100', () => {
    expect(service.getData()).toEqual(100);
  });

  // spec-3 --working
  it('getSum return sum', () => {
    expect(service.getSum(1,2)).toEqual(3);
  });

  // spec for posts
  let actualPosts = [
    {
      "userId": 1,
      "id": 1,
      "title": "quidem molestiae enim"
    },
    {
      "userId": 1,
      "id": 2,
      "title": "sunt qui excepturi placeat culpa"
    }
]
  
  it('can get posts', () => {
    service.getPosts().subscribe((post)=>{
      actualPosts = post
    })

  // check pending req
  const request = controller.expectOne("https://jsonplaceholder.typicode.com/albums")

  // send response
  request.flush({post:{posts:actualPosts}})

  // verify
  controller.verify()

  expect(actualPosts).toEqual(actualPosts)
    });

});
