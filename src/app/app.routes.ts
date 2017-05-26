import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgenciasComponent } from './componentes/agencias/agencias.component';

// Route Configuration
export const routes: Routes = [
    { path: '', component: AgenciasComponent},
   // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);