import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem("userTokenAPI");
  if (token != null) {
    return true;
  }else{
    router.navigateByUrl("/login");
    return false;
  }

};
