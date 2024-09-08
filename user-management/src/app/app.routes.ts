import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { DashboardComponent } from './admin-portal/dashboard/dashboard.component';
import { UserPortalComponent } from './user-portal/user-portal.component';
import { MessageComponent } from './admin-portal/message/message.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'register' , component: RegistrationComponent },
    { path: 'user-home', component: UserPortalComponent },
    { 
        path: 'admin', 
        component: AdminPortalComponent,
        children: [
            {
                path: '',
                component: MessageComponent
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            }
        ]
    }
];
