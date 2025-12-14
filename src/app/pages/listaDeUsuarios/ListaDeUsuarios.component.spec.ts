import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastrarUsuarioComponent } from '../CadastrarnovoUsuario/CadastrarnovoUsuario.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoadingService } from '../../shared/loading.service'; // ⭐ SE USAR O SERVICE

describe('CadastrarnovoUsuarioComponent', () => {
  let component: CadastrarUsuarioComponent;
  let fixture: ComponentFixture<CadastrarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CadastrarUsuarioComponent
      ],
      providers: [
        LoadingService // ⭐ SE O COMPONENTE USAR
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastrarUsuarioComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
