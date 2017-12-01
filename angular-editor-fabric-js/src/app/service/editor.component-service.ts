import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EditorService {
    urlListaTodos = "http://demanda-ti-prd.z56pv5yub2.sa-east-1.elasticbeanstalk.com/galeria/";
    urlCreate = "http://demanda-ti-prd.z56pv5yub2.sa-east-1.elasticbeanstalk.com/create/";

    constructor(private http: Http) { }

    incluirFoto(foto: any): Observable<any> {
        return this.http.post(this.urlCreate, foto).map(res => res.json());
    }

    getGaleriaObservable(): Observable<any[]> {
        return this.http.get(this.urlListaTodos)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    getGaleriaPromise(): Promise<any[]> {
        return this.http.get(this.urlListaTodos).toPromise()
            .then(this.extractData)
            .catch(this.handleErrorPromise);
    }
    private extractData(res: Response) {
        let body = res.json();
        return body;
    }
    private handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }
    private handleErrorPromise(error: Response | any) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    }
} 