import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BaseComponent } from './base/base.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './ui/components/login/login.component';
import { FacebookLoginProvider, GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { HttpErrorHandlerInterceptorService } from './services/common/http-error-handler-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AdminModule, UiModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem("accessToken"),
        allowedDomains: ["localhost:7271"]
      }
    }),
    SocialLoginModule,
    GoogleSigninButtonModule
  ],
  providers: [
   {  provide: "baseUrl", useValue: "https://localhost:7271/api", multi: true },
   {
    provide: "SocialAuthServiceConfig",
    useValue: {
        autoLogin: false,
        providers: [
          {
            id : GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider("744749868796-po6282ifpiuprvoqs74d5qltnoj932ko.apps.googleusercontent.com")
          },
          {
            id : FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider("595001465957694")
          }
        ],
        onError: err => console.log(err)
    } as SocialAuthServiceConfig
   },
   { provide:HTTP_INTERCEPTORS, useClass: HttpErrorHandlerInterceptorService, multi:true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
