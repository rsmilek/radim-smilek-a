import { Component } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  group,
} from '@angular/animations';

interface PortfolioImage {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [],
  animations: [
    trigger('portfolioAnim', [
      transition(':enter', [
        query('.portfolio-item', [
          style({ opacity: 0, transform: 'scale(0.9)' }),
          stagger(150, [
            animate(
              '0.5s ease-out',
              style({ opacity: 1, transform: 'scale(1)' }),
            ),
          ]),
        ], { optional: true }),
      ]),
    ]),
  ],
  template: `
    <section class="resume-section" id="portfolio" @portfolioAnim>
      <div class="section-inner">
        <div class="article-title">Portfolio</div>
        <p class="article-paragraph">See my work in pictures.</p>
        <div class="portfolio-grid">
          @for (img of images; track img.src) {
            <div class="portfolio-item">
              <img [src]="img.src" [alt]="img.alt" class="portfolio-img" />
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      :host { display: block; }

      .resume-section {
        min-height: 100dvh;
        padding: 5rem 2rem 3rem;
        display: flex;
        align-items: flex-start;
        justify-content: center;
      }

      .section-inner {
        max-width: 960px;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .article-title {
        font-size: 2rem;
        font-weight: 700;
        color: var(--mat-sys-primary);
        border-left: 4px solid var(--mat-sys-primary);
        padding-left: 0.75rem;
      }

      .article-paragraph {
        font-size: 1rem;
        line-height: 1.7;
        color: var(--mat-sys-on-surface);
      }

      .portfolio-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }

      @media (max-width: 600px) {
        .portfolio-grid { grid-template-columns: 1fr; }
      }

      .portfolio-item {
        overflow: hidden;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }

      .portfolio-img {
        width: 100%;
        display: block;
        object-fit: cover;
        transition: transform 0.3s ease;

        &:hover { transform: scale(1.03); }
      }
    `,
  ],
})
export class PortfolioComponent {
  protected readonly images: PortfolioImage[] = [
    { src: '/assets/images/portfolio/iot-chart.png', alt: 'IoT Chart' },
    { src: '/assets/images/portfolio/kerberos.png', alt: 'Kerberos' },
    { src: '/assets/images/portfolio/scadus.png', alt: 'Scadus' },
    { src: '/assets/images/portfolio/datalog.png', alt: 'Datalog' },
  ];
}
