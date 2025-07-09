import { Routes } from '@angular/router';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { RegisterPageComponent } from './auth/register-page/register-page.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { AuthGuard } from './guards/auth.guard';
import { ListaTareasComponent } from './tareas/lista-tareas/lista-tareas.component';
import { CrearTareaComponent } from './tareas/crear-tarea/crear-tarea.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },

  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'tasks', component: ListaTareasComponent },
      { path: 'tasks/create', component: CrearTareaComponent }
    ]
  }
];


