import { Routes } from '@angular/router';
import { ProductoFormComponent } from './component/producto-form.component';
import { ProductoListComponent } from './component/producto-list.component';
import { LoginComponent } from './component/login.component';
import { CartComponent } from './component/cart.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
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
        path: 'cart',
        component: CartComponent
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];
