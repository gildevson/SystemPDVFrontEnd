import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteUsuariosComponent } from './DeleteUsuarios.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';

describe('DeleteUsuariosComponent', () => {
  let component: DeleteUsuariosComponent;
  let fixture: ComponentFixture<DeleteUsuariosComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DeleteUsuariosComponent,
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => 'ABC123' } }
          }
        },
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteUsuariosComponent);
    component = fixture.componentInstance;

    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => httpMock.verify());

  // --------------------------------------------------------
  // 1. Deve criar o componente
  // --------------------------------------------------------
  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  // --------------------------------------------------------
  // 2. Deve buscar dados do usuário ao iniciar
  // --------------------------------------------------------
  it('should load user data on init', () => {
    const req = httpMock.expectOne('https://localhost:7110/api/users/ABC123');
    expect(req.request.method).toBe('GET');

    req.flush({ nome: 'Gilson' });

    expect(component.nomeUsuario).toBe('Gilson');
    expect(component.carregando).toBeFalse();
  });

  // --------------------------------------------------------
  // 3. Botão só habilita quando o nome está correto
  // --------------------------------------------------------
  it('should only allow deletion when name matches', () => {
    component.nomeUsuario = 'Gilson';

    component.confirmacaoNome = 'Errado';
    fixture.detectChanges();

    expect(component.confirmacaoNome === component.nomeUsuario).toBeFalse();

    component.confirmacaoNome = 'Gilson';
    fixture.detectChanges();

    expect(component.confirmacaoNome === component.nomeUsuario).toBeTrue();
  });

  // --------------------------------------------------------
  // 4. Deve chamar DELETE corretamente
  // --------------------------------------------------------
  it('should call DELETE API on confirmarExclusao()', () => {
    component.userId = 'ABC123';
    component.nomeUsuario = 'Gilson';
    component.confirmacaoNome = 'Gilson';

    component.confirmarExclusao();

    const req = httpMock.expectOne('https://localhost:7110/api/Auth');
    expect(req.request.method).toBe('DELETE');
    expect(req.request.body).toEqual({ id: 'ABC123' });

    req.flush({ sucesso: true });
  });
});
