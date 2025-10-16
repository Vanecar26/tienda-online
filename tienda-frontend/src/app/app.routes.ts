import { Routes } from '@angular/router';
import { ProductoFormComponent } from './component/producto-form.component';
import { ProductoListComponent } from './component/producto-list.component';

export const routes: Routes = [
    {
        path: 'productos',
        component: ProductoListComponent
    },
    {
        path: 'productos/new',
        component: ProductoFormComponent
    },
    {
        path: 'productos/edit/:id',
        component: ProductoFormComponent
    },
    {
        path: '',
        redirectTo: '/productos',
        pathMatch: 'full'
    }
];
