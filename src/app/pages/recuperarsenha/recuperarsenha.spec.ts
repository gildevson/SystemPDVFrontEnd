import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperarsenhaComponent } from './recuperarsenha.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RecuperarsenhaComponent', () => {

  let component: RecuperarsenhaComponent;
  let fixture: ComponentFixture<RecuperarsenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RecuperarsenhaComponent, // componente standalone
        FormsModule,
        HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperarsenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

});
