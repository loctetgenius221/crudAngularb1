import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../models/post.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  form!: FormGroup;
  posts: Post[] = [];

  constructor(public postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required])
    });
  }

  loadPosts() {
    this.postService.getAll().subscribe((data: Post[]) => {
      this.posts = data;
      console.log(this.posts);
    });
  }

  deletePost(id: number) {
    this.postService.delete(id).subscribe(res => {
      this.posts = this.posts.filter(item => item.id !== id);
      Swal.fire({
        title: 'Etes vous sure de vouloir supprimer cette article?',
        text: 'L\'article sera supprimer définitivement!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimer l\'article!',
        cancelButtonText: 'Non, ne pas supprimer it'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Supprimer!', 'Votre article a été supprimer avec succès.', 'success');
        } else {
          Swal.fire('Annuler', 'Supprssion annulée', 'error');
        }
      });
    })
  }


  // Ajout
  get f() {
    return this.form.controls;
  }

  submit() {
    const newPost: Post = this.form.value;
    this.postService.create(newPost).subscribe((res: Post) => {
      // Ajout du nouvel article à la liste
      this.posts.push(res);
      console.log(newPost)
      this.form.reset();
      Swal.fire({
        title: 'Succès!',
        text: 'Votre article a été ajouté avec succès.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    });
  }
}
