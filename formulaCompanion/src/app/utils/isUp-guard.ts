import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { FormulaApiService } from "../services/formula-api.service";

@Injectable({
    providedIn: 'root'
})
export class IsupGuard implements CanActivate {

    constructor(private _router: Router, private formulaApiService:FormulaApiService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const isUp = this.formulaApiService.getAllDrivers().subscribe(res => {
            return true;
        },
        error => {
            this._router.navigateByUrl('/ko');
            return false;
        }
        );
        return true;
    }

}
