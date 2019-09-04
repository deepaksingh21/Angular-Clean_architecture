import { Injectable } from '@angular/core';
import { ElephantRepository } from '../../../core/repositories/elephant.repository';
import { ElephantModel } from '../../../core/domain/elephant.model';
import { Observable } from 'rxjs';
import { ElephantWebRepositoryMapper } from './elephant-web-repository-mapper';
import { HttpClient } from '@angular/common/http';
import { ElephantWebEntity } from './elephant-web-entity';
import { flatMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ElephantWebRepository extends ElephantRepository {

  mapper = new ElephantWebRepositoryMapper();

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  getElephantById(id: number): Observable<ElephantModel> {
    return this.http
      .get<ElephantWebEntity>('http://5b8d40db7366ab0014a29bfa.mockapi.io/api/v1/elephants/${id}')
      .pipe(map(this.mapper.mapFrom));
  }

  getAllElephants(): Observable<ElephantModel> {
    return this.http
      .get<ElephantWebEntity[]>('http://5b8d40db7366ab0014a29bfa.mockapi.io/api/v1/elephants')
      .pipe(flatMap((item) => item))
      .pipe(map(this.mapper.mapFrom));
  }
}
