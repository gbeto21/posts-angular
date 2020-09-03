import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";

import { Post } from "../post.model";
import { PostService } from "../posts.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: 'Fist post', content: 'This is the first post\'s content.'},
  //   {title: 'Second post', content: 'This is the second post\'s content.'},
  //   {title: 'Third post', content: 'This is the third post\'s content.'},
  // ]

  posts: Post[] = []
  private postSub: Subscription

  constructor(public postsService: PostService) {

  }

  ngOnInit() {
    this.postsService.getPosts()
    this.postSub = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts
      })
  }

  ngOnDestroy() {
    this.postSub.unsubscribe()
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId)
  }

}
