import { Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';

export const routes: Routes = [
  {path:'post', redirectTo:'index', pathMatch:'full'},
  {path:'index', component:IndexComponent},
  {path:'create', component:CreateComponent},
  {path:':postId/edit', component:EditComponent},
  {path:':postId/view', component:ViewComponent}
];
