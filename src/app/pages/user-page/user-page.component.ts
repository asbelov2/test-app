import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {
  username: string | undefined
  email: string | undefined
  avatar: string | undefined
  posts: Post[] | undefined
  constructor(private userService: UserService, private http: HttpClient, private router: Router) {
    this.username = userService.username
    this.email = userService.email
    this.avatar = userService.avatar
  }
  ngOnInit() {
    this.http.get(`http://185.26.53.195:5058/api/Post/GetPostByUserEmail?email=${this.email}`).subscribe(next => {
      this.posts = next as Post[]
    })
  }

  editPost(post: Post) {
    this.router.navigate(['/post', { id: post.id }])
  }
}
