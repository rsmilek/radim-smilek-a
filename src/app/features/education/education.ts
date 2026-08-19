import { Component } from '@angular/core';
import { trigger, transition, style, animate, query, stagger, group } from '@angular/animations';

interface EducationEntry {
  institution: string;
  degree: string;
  period: string;
  field: string;
  thesis: string;
}

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [],
  animations: [
    trigger('sectionAnim', [
      transition(':enter', [
        group([
          query('.article-title', [
            style({ opacity: 0, transform: 'translateX(-40px)' }),
            animate('0.6s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
          ]),
          query('.edu-entry', [
            style({ opacity: 0, transform: 'translateY(24px)' }),
            stagger(150, [
              animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
          ], { optional: true }),
        ]),
      ]),
    ]),
  ],
  template: `
    <section class="resume-section" id="education" @sectionAnim>
      <div class="section-inner">
        <div class="article-title">Education</div>
        <p class="article-paragraph">
          We have been educated since birth, but the most important things will teach us life ourselves…
          Follow the education that others have committed to me.
        </p>

        @for (entry of entries; track entry.institution) {
          <div class="edu-entry">
            <div class="article-subtitle">{{ entry.institution }}</div>
            <div class="article-paragraph italic">{{ entry.degree }} &bull; {{ entry.period }}</div>
            <div class="article-paragraph italic">{{ entry.field }}</div>
            <div class="article-paragraph">{{ entry.thesis }}</div>
          </div>
        }
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
        align-items: center;
        justify-content: center;
      }

      .section-inner {
        max-width: 800px;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      .article-title {
        font-size: 2rem;
        font-weight: 700;
        color: var(--mat-sys-primary);
        border-left: 4px solid var(--mat-sys-primary);
        padding-left: 0.75rem;
      }

      .article-subtitle {
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--mat-sys-secondary);
        margin-top: 1.25rem;
      }

      .article-paragraph {
        font-size: 1rem;
        line-height: 1.7;
        color: var(--mat-sys-on-surface);
      }

      .italic { font-style: italic; }

      .edu-entry { display: contents; }
    `,
  ],
})
export class EducationComponent {
  protected readonly entries: EducationEntry[] = [
    {
      institution: 'Technical University of Ostrava',
      degree: 'Bachelor of Engineering - BE',
      period: '1992 – 1997',
      field: 'Electronics and telecommunications technology, Measurement and automation technology',
      thesis:
        'Diploma thesis — Automated monitoring of frames and signaling of 2Mbit/s flows in telecommunications: ' +
        'creation of an application for data collection and analysis in LabVIEW including device drivers for GPIB bus ' +
        '(call analyzer Gm EPC91 and flow multiplexer Tesla MLT293)',
    },
    {
      institution: 'High School of Rožnov pod Radhoštěm',
      degree: 'Leaving examination',
      period: '1988 – 1992',
      field: 'Microelectronics',
      thesis:
        'Graduation project — electronic potentiometer for audio signal level control with visualization of ' +
        'settings with the help of LED',
    },
  ];
}
