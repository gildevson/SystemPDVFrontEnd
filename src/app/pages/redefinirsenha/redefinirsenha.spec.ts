import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RedefinirsenhaComponent } from './redefinirsenha.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RedefinirsenhaComponent', () => {
  let component: RedefinirsenhaComponent;
  let fixture: ComponentFixture<RedefinirsenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RedefinirsenhaComponent,
        FormsModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedefinirsenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

//**************************/
