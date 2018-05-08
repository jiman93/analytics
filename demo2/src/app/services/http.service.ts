import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';
import {
    Http,
    RequestOptions,
    RequestOptionsArgs,
    Response,
    Request,
    Headers,
    XHRBackend
} from '@angular/http';

import { LoaderService } from './loader.service';

@Injectable()
export class HttpService extends Http {

    apiUrl = '/';

    constructor(
        backend: XHRBackend,
        defaultOptions: RequestOptions,
        private loaderService: LoaderService
    ) { 
        super(backend, HttpService.addAuthToken(defaultOptions));
    }

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>{
        this.showLoader();
        console.log(url);
        return super.put(url,body, this.requestOptions(options))
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            })
            .finally(() => {
                this.onEnd();
            });
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response>{
        this.showLoader();
        console.log(url);
        return super.delete(url, this.requestOptions(options))
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            })
            .finally(() => {
                this.onEnd();
            });
    }
    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>{
        this.showLoader();
        console.log(url);
        return super.post(url,body, this.requestOptions(options))
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            })
            .finally(() => {
                this.onEnd();
            });
    }
    get(url: string, options?: RequestOptionsArgs): Observable<any> {
        this.showLoader();
        console.log(url);
        return super.get(url, this.requestOptions(options))
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            })
            .finally(() => {
                this.onEnd();
            });
    }

    
    private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
        console.log('rq opt');
        if (options == null) {
            options = new RequestOptions();
        }

        if (options.headers == null) {
            options.headers = new Headers();
            
        }
        HttpService.addAuthToken(options);
        return options;
    }
    static addAuthToken(options){
        if(HttpService.getAuthToken()){
            options.headers.set('Auth-Token',HttpService.getLoggedInUser()+','+ HttpService.getAuthToken());
        }
        console.log('this.getAuthToken()',HttpService.getAuthToken());
        return options;
    }

    static getAuthToken(): string {
        if (HttpService.getUserAuth()) {
            return HttpService.getUserAuth().data.credentials;
        } else {
            return null;
        }
    }

    static getLoggedInUser():string{
        if (HttpService.getUserAuth()) {
            return HttpService.getUserAuth().data.userName;
        } else {
            return null;
        }
    }

    static getUserAuth(): any {
        if (localStorage.getItem('user-auth')) {
            return JSON.parse(localStorage.getItem('user-auth'));
        } else {
            return null;
        }
    }

    private getFullUrl(url: string): string {
        return this.apiUrl + url;
    }

    private onCatch(error: any, caught: Observable<any>): Observable<any> {
        return Observable.throw(error);
    }

    private onSuccess(res: Response): void {
        console.log('Request successful');
    }

    private onError(res: Response): void {
        console.log('Error, status code: ' + res.status);
    }

    private onEnd(): void {
        this.hideLoader();
    }

    private showLoader(): void {
        this.loaderService.show();
    }

    private hideLoader(): void {
        this.loaderService.hide();
    }
}