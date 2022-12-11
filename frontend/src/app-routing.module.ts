import { NgModule } from '@angular/core';
import { Routes,RouterModule} from '@angular/router';
import { DashboardComponent } from './app/components/dashboard/dashboard.component';
import { ProfileComponent } from './app/components/profile/profile.component';

const routes: Routes =[
    { path: 'dashboard', component: DashboardComponent},
    { path: 'profile', component: ProfileComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}