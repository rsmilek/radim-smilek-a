import { Component } from '@angular/core';

interface PortfolioImage {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [],
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
