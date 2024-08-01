import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';


@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {

  id!:number;
  post!:Post;
  comments: Comment[] = []

  constructor(public postService:PostService, private router:Router, private route:ActivatedRoute){}

  ngOnInit():void{
    this.id = this.route.snapshot.params['postId'];
    this.postService.find(this.id).subscribe((data:Post)=>{
      this.post = data;
    })
    this.postService.getComments(this.id).subscribe((data: Comment[]) => {
      this.comments = data;
    });
  }

}
