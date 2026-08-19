import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  inject,
  computed,
} from '@angular/core';
import gsap from 'gsap';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-home-gsap',
  standalone: true,
  imports: [],
  template: `
    <header class="masthead" id="home-gsap" [style.background]="mastheadBg()">
      <div class="masthead-inner">
        <div class="headline-group">
          <h1 class="headline" #h1>Hi,</h1>
          <h1 class="headline" #h2>I'm Radim Smílek,</h1>
          <h1 class="headline" #h3>software developer.</h1>
        </div>
        <hr class="divider" #divider />
        <h4 class="description" #description>Desktop &bull; Web &bull; Mobile</h4>
        <a class="cta-btn" #btn (click)="scrollToAbout()">Find Out More</a>
      </div>
    </header>
  `,
  styles: [
    `
      :host { display: block; }

      .masthead {
        height: 100dvh;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        background: center center / cover no-repeat;
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
      }
    `,
  ],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private readonly elRef = inject(ElementRef);
  private readonly themeService = inject(ThemeService);
  private tween = gsap.timeline({ paused: true });

  protected readonly mastheadBg = computed(() =>
    this.themeService.theme() === 'dark'
      ? 'linear-gradient(to bottom, rgba(43, 42, 42, 0.8) 0%, rgba(26, 25, 24, 0.8) 100%), url("/assets/images/bg-resume-wide.jpg") center center / cover no-repeat'
      : 'linear-gradient(to bottom, rgba(180, 179, 179, 0.8) 0%, rgba(216, 211, 207, 0.8) 100%), url("/assets/images/bg-resume-wide.jpg") center center / cover no-repeat',
  );

  ngAfterViewInit(): void {
    const host: HTMLElement = this.elRef.nativeElement;
    const headlines = Array.from(host.querySelectorAll<HTMLElement>('.headline'));
    const divider = host.querySelector<HTMLElement>('.divider');
    const description = host.querySelector<HTMLElement>('.description');
    const btn = host.querySelector<HTMLElement>('.cta-btn');

    const OFFSET = 0.7;

    this.tween
      // Headlines — move up
      .from(headlines, { y: 44, stagger: 0.1, ease: 'none' }, OFFSET)
      // Headlines — fade in
      .from(headlines, { opacity: 0, stagger: 0.1, ease: 'power2.in' }, OFFSET)
      // Divider — fade in
      .from(divider, { opacity: 0, ease: 'none', duration: 1 }, OFFSET + 0.1)
      // Description — slide + fade in
      .from(description, { opacity: 0, x: -200, ease: 'elastic.out', duration: 2 }, OFFSET + 0.1)
      // Button — fade in
      .from(btn, { opacity: 0 }, OFFSET + 0.3)
      .play();
  }

  ngOnDestroy(): void {
    this.tween.kill();
  }

  protected scrollToAbout(): void {
    document.getElementById('about-me')?.scrollIntoView({ behavior: 'smooth' });
  }
}
