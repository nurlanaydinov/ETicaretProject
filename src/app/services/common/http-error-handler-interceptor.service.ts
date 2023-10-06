import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService: CustomToastrService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     return next.handle(req).pipe(catchError(error=> {
      switch (error.status){
        case HttpStatusCode.Unauthorized:
          this.toastrService.message("You dont have access", "Permission", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          })
          break;
        case HttpStatusCode.InternalServerError:
          this.toastrService.message("Internal Server Error", "Server Error", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth})
          break;
        case HttpStatusCode.BadRequest:
          this.toastrService.message("Did Bad Request", "Bad Request", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth})
          break;
        case HttpStatusCode.NotFound:
          this.toastrService.message("Data not found", "Not Found", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth})
          break;
        default:
          this.toastrService.message("Unexpected Error", "Unexpected Error", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth})
        break;
      }   
       return of(error);
     }));
  }
}
