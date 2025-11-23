import { ListaDeUsuariosComponent } from './listaDeUsuarios.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

describe('ListaDeUsuariosComponent', () => {

  let http: HttpClient;
  let routerSpy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    });

    http = TestBed.inject(HttpClient);
    routerSpy = TestBed.inject(Router);
  });

  it('should create component', () => {
    const component = new ListaDeUsuariosComponent(http, routerSpy);
    expect(component).toBeTruthy();
  });
});
