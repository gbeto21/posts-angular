import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";

import { Post } from "../post.model";
import { PostService } from "../posts.service";
import { PageEvent } from '@angular/material/paginator';

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
  isLoading = false
  totalPosts = 10
  postsPerPage = 2
  pageSizeOptions = [1, 2, 5, 10]
  private postSub: Subscription

  constructor(public postsService: PostService) {

  }

  ngOnInit() {
    this.isLoading = true
    this.postsService.getPosts()
    this.postSub = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false
        this.posts = posts
      })
  }

  ngOnDestroy() {
    this.postSub.unsubscribe()
  }

  onChangedPage(pageData: PageEvent) {

  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId)
  }

}
