import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post-screen',
  templateUrl: './post-screen.component.html',
  styleUrls: ['./post-screen.component.scss']
})
export class PostScreenComponent {
  post: Post = new Post(0, 0, "", "")
  isNewPost: boolean = true;
  constructor(private http: HttpClient, private router: Router, private userService: UserService, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(next => {
      if ((next as any)?.id) {
        this.isNewPost = false
        this.http.get(`https://185.26.53.195:5058/api/Post/${(next as any).id}`).subscribe(next => {
          this.post = next as Post
        })
      } else {
        this.isNewPost = true
        this.post = new Post(0, 0, "", "")
      }
    })
  }

  createPost(event: Event) {
    event.preventDefault()
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      })
    }
    this.http.get(`https://185.26.53.195:5058/api/user/CheckEmail?email=${this.userService.email}`).subscribe(next => {
      this.post.userId = (next as any).id
      this.http.post('https://185.26.53.195:5058/api/Post/', this.post, httpOptions).subscribe((next) => {
        this.router.navigateByUrl('/profile')
      })
    })
  }

  updatePost(event: Event) {
    event.preventDefault()
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      })
    }
    this.http.get(`https://185.26.53.195:5058/api/user/CheckEmail?email=${this.userService.email}`).subscribe(next => {
      this.post.userId = (next as any).id
      this.http.put(`https://185.26.53.195:5058/api/Post/${this.post.id}`, this.post, httpOptions).subscribe((next) => {
        this.router.navigateByUrl('/profile')
      })
    })
  }
}
