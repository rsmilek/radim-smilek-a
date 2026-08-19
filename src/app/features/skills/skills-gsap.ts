// GSAP version
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  inject,
  viewChildren,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import gsap from 'gsap';
import { SKILL_ICONS } from '../../shared/icons/icons';

interface SkillIcon {
  key: string;
  title: string;
  svg: SafeHtml;
}

interface SkillGroup {
  header: string;
  icons: SkillIcon[];
}

@Component({
  selector: 'app-skills-gsap',
  standalone: true,
  imports: [],
  template: `
    <section class="resume-section" id="skills-gsap">
      <div class="section-inner">
        <div class="article-title">Skills (GSAP)</div>
        <p class="article-paragraph">
          Worked primarily with C# and JavaScript with frameworks such as .NET, .NET Core and React.js.
        </p>
        <p class="article-paragraph mt-1">
          Experienced in both SQL and NoSQL, having worked in companies making use of MS SQL, MySQL and SQLite,
          with personal further projects utilizing Influxdb.
        </p>

        @for (group of skillGroups; track group.header; let i = $index) {
          <div class="skill-group">
            <div class="skill-header gsap-header">{{ group.header }}</div>
            <div class="icons-container">
              @for (icon of group.icons; track icon.key) {
                <div class="icon-wrapper">
                  <div class="icon-box">
                    <div class="skill-icon gsap-icon" [innerHTML]="icon.svg"></div>
                    <div class="skill-title gsap-title">{{ icon.title }}</div>
                  </div>
                </div>
              }
            </div>
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
        align-items: flex-start;
        justify-content: center;
      }

      .section-inner {
        max-width: 900px;
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

      .mt-1 { margin-top: 0.5rem; }

      .skill-group { margin-top: 1rem; }

      .skill-header {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--mat-sys-secondary);
        margin-bottom: 0.75rem;
      }

      .icons-container {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
      }

      .icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .icon-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.35rem;
        width: 72px;
      }

      .skill-icon {
        width: 48px;
        height: 48px;

        ::ng-deep svg {
          width: 48px;
          height: 48px;
          fill: var(--mat-sys-on-surface);
        }
      }

      .skill-title {
        font-size: 0.7rem;
        text-align: center;
        color: var(--mat-sys-on-surface-variant);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 72px;
        opacity: 0;
        scale: 0;
      }
    `,
  ],
})
export class SkillsGsapComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly elRef = inject(ElementRef);
  private animationTween = gsap.timeline({ paused: true });
  private observer: IntersectionObserver | null = null;

  protected readonly skillGroups: SkillGroup[] = [
    {
      header: 'Programming languages',
      icons: this.#icons([
        ['c', 'C'], ['csharp', 'C#'], ['delphi', 'Delphi'],
        ['javascript', 'JavaScript'], ['html5', 'HTML5'], ['css3', 'CSS3'],
        ['sass', 'Sass'], ['graphql', 'GraphQL'], ['python', 'Python'],
      ]),
    },
    {
      header: 'Frameworks & Libraries',
      icons: this.#icons([
        ['dotnet', '.NET'], ['xamarin', 'Xamarin'], ['react', 'React'],
        ['nodejs', 'NodeJS'], ['bootstrap', 'Bootstrap'], ['jquery', 'JQuery'],
        ['gatsby', 'Gatsby'], ['nextjs', 'NextJS'],
      ]),
    },
    {
      header: 'Databases',
      icons: this.#icons([
        ['microsoftsqlserver', 'MS SQL'], ['sqlite', 'SQLite'],
        ['influx', 'Influx'], ['mysql', 'MySQL'],
      ]),
    },
    {
      header: "IDE's & Tools",
      icons: this.#icons([
        ['visualstudio', 'VS'], ['visualstudiocode', 'VS Code'],
        ['github', 'Github'], ['subversion', 'SVN'],
        ['nuget', 'Nuget'], ['npm', 'NPM'], ['yarn', 'Yarn'], ['docker', 'Docker'],
      ]),
    },
    {
      header: 'Test/Measurement & IoT',
      icons: this.#icons([
        ['nationalInstruments', 'National Instruments'], ['labview', 'Labview'],
        ['arduino', 'Arduino'], ['raspberrypi', 'Raspberry PI'], ['zigbee', 'Zigbee'],
      ]),
    },
  ];

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.#bindAnimation();
    this.#setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.animationTween.kill();
  }

  #icons(entries: [string, string][]): SkillIcon[] {
    return entries.map(([key, title]) => ({
      key,
      title,
      svg: this.sanitizer.bypassSecurityTrustHtml(SKILL_ICONS[key] ?? ''),
    }));
  }

  #bindAnimation(): void {
    const STAGGER = 0.3;
    const host: HTMLElement = this.elRef.nativeElement;
    const groups = host.querySelectorAll<HTMLElement>('.skill-group');

    groups.forEach((group, index) => {
      const header = group.querySelector<HTMLElement>('.gsap-header');
      const icons = Array.from(group.querySelectorAll<HTMLElement>('.gsap-icon'));
      const titles = Array.from(group.querySelectorAll<HTMLElement>('.gsap-title'));
      const DURATION = icons.length * STAGGER;
      const OFFSET = 0.3 * index;

      this.animationTween
        // Header – show
        .from(header, { opacity: 0 }, 0 + OFFSET)
        // Titles – show
        .to(
          titles,
          { duration: DURATION, scale: 1, opacity: 1, stagger: STAGGER, ease: 'elastic', force3D: true },
          0 + OFFSET,
        )
        // Titles – hide
        .to(
          titles,
          { duration: DURATION, scale: 1, opacity: 0, stagger: STAGGER, ease: 'elastic', force3D: true },
          OFFSET + STAGGER + 0.1,
        )
        // Icons – show
        .from(
          icons,
          { duration: DURATION, scale: 0.5, opacity: 0, stagger: STAGGER, ease: 'elastic', force3D: true },
          OFFSET + 2 * STAGGER,
        );
    });
  }

  #setupIntersectionObserver(): void {
    const host: HTMLElement = this.elRef.nativeElement;
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) this.animationTween.restart();
      },
      { threshold: 0.5 },
    );
    this.observer.observe(host);
  }
}
