import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastrarnovoUsuarioComponent } from '../CadastrarnovoUsuario/CadastrarnovoUsuario.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoadingService } from '../../shared/loading.service'; // ⭐ SE USAR O SERVICE

describe('CadastrarnovoUsuarioComponent', () => {
  let component: CadastrarnovoUsuarioComponent;
  let fixture: ComponentFixture<CadastrarnovoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CadastrarnovoUsuarioComponent
      ],
      providers: [
        LoadingService // ⭐ SE O COMPONENTE USAR
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastrarnovoUsuarioComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
