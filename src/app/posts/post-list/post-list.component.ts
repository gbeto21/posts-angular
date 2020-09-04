import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";

import { Post } from "../post.model";
import { PostService } from "../posts.service";
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';

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
  totalPosts = 0
  postsPerPage = 2
  currentPage = 1
  pageSizeOptions = [1, 2, 5, 10]
  userIsAuthenticated = false
  userId: string
  private postSub: Subscription
  private authStatusSub: Subscription

  constructor(public postsService: PostService, private authService: AuthService) {

  }

  ngOnInit() {
    this.isLoading = true
    this.postsService.getPosts(this.postsPerPage, this.currentPage)
    this.userId = this.authService.getUserId()
    this.postSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postsData: { posts: Post[], postCount: number }) => {
        this.isLoading = false
        this.totalPosts = postsData.postCount
        this.posts = postsData.posts
      })

    this.userIsAuthenticated = this.authService.getIsAuth()

    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated
        this.userId = this.authService.getUserId()
      })

  }

  ngOnDestroy() {
    this.postSub.unsubscribe()
    this.authStatusSub.unsubscribe()
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true
    this.currentPage = pageData.pageIndex + 1
    this.postsPerPage = pageData.pageSize
    this.postsService.getPosts(this.postsPerPage, this.currentPage)
  }

  onDelete(postId: string) {
    this.isLoading = true
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage)
    }, () => {
      this.isLoading = false
    })
  }

}
