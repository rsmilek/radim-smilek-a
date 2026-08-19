import { Component } from '@angular/core';

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
