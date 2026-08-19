import {
  Component,
  OnInit,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  query,
  group,
  stagger,
} from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  animations: [
    trigger('heroAnim', [
      transition(':enter', [
        group([
          query('.headline', [
            style({ opacity: 0, transform: 'translateY(44px)' }),
            stagger(100, [
              animate(
                '0.6s 0.7s cubic-bezier(0.25,0.46,0.45,0.94)',
                style({ opacity: 1, transform: 'translateY(0)' }),
              ),
            ]),
          ]),
          query('.divider', [
            style({ opacity: 0 }),
            animate('1s 0.8s ease', style({ opacity: 1 })),
          ]),
          query('.description', [
            style({ opacity: 0, transform: 'translateX(-200px)' }),
            animate(
              '2s 0.8s cubic-bezier(0.175,0.885,0.32,1.275)',
              style({ opacity: 1, transform: 'translateX(0)' }),
            ),
          ]),
          query('.cta-btn', [
            style({ opacity: 0 }),
            animate('0.4s 1s ease', style({ opacity: 1 })),
          ]),
        ]),
      ]),
    ]),
  ],
  template: `
    <header class="masthead" id="home" @heroAnim>
      <div class="masthead-inner">
        <div class="headline-group">
          <h1 class="headline">Hi,</h1>
          <h1 class="headline">I'm Radim Smílek,</h1>
          <h1 class="headline">software developer.</h1>
        </div>
        <hr class="divider" />
        <h4 class="description">Desktop &bull; Web &bull; Mobile</h4>
        <a class="cta-btn" (click)="scrollToAbout()">Find Out More</a>
      </div>
    </header>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .masthead {
        height: 100dvh;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        background: url('/assets/images/bg-resume-wide.jpg') center center / cover no-repeat;
        overflow: hidden;
      }

      .masthead-inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
      }

      .headline-group {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      h1.headline {
        font-size: clamp(2rem, 5vw, 3.5rem);
        font-weight: 700;
        margin: 0.125rem 0;
        color: var(--mat-sys-on-surface);
      }

      .divider {
        width: 80%;
        border: none;
        border-top: 4px solid var(--mat-sys-primary);
        margin: 0.5rem auto;
      }

      .description {
        font-size: clamp(1rem, 2.5vw, 1.5rem);
        font-weight: 700;
        margin: 0;
        color: var(--mat-sys-on-surface);
      }

      .cta-btn {
        display: inline-block;
        margin-top: 1rem;
        padding: 0.75rem 2rem;
        background: var(--mat-sys-primary);
        color: var(--mat-sys-on-primary);
        border-radius: 4px;
        font-weight: 600;
        cursor: pointer;
        text-decoration: none;
        transition: opacity 0.2s;

        &:hover {
          opacity: 0.9;
        }
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  private readonly el = inject(ElementRef);

  ngOnInit(): void {}

  protected scrollToAbout(): void {
    document.getElementById('about-me')?.scrollIntoView({ behavior: 'smooth' });
  }
}
