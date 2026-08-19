// Angular Animations version
import {
  Component,
  OnInit,
  ElementRef,
  inject,
  signal,
  DestroyRef,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  query,
  stagger,
  group,
  AnimationBuilder,
  AnimationPlayer,
} from '@angular/animations';
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
  selector: 'app-skills-angular',
  standalone: true,
  imports: [],
  animations: [
    trigger('groupAnim', [
      transition(':enter', [
        group([
          query('.skill-header', [
            style({ opacity: 0 }),
            animate('0.4s ease-in', style({ opacity: 1 })),
          ], { optional: true }),
          query('.skill-title', [
            style({ opacity: 0, scale: 0 }),
            stagger(300, [
              animate('0.4s cubic-bezier(0.175,0.885,0.32,1.275)', style({ opacity: 1, scale: 1 })),
              animate('0.4s 0.1s cubic-bezier(0.175,0.885,0.32,1.275)', style({ opacity: 0, scale: 1 })),
            ]),
          ], { optional: true }),
          query('.skill-icon', [
            style({ opacity: 0, scale: 0.5 }),
            stagger(300, [
              animate('0.6s 0.6s cubic-bezier(0.175,0.885,0.32,1.275)', style({ opacity: 1, scale: 1 })),
            ]),
          ], { optional: true }),
        ]),
      ]),
    ]),
  ],
  template: `
    <section class="resume-section" id="skills">
      <div class="section-inner">
        <div class="article-title">Skills</div>
        <p class="article-paragraph">
          Worked primarily with C# and JavaScript with frameworks such as .NET, .NET Core and React.js.
        </p>
        <p class="article-paragraph mt-1">
          Experienced in both SQL and NoSQL, having worked in companies making use of MS SQL, MySQL and SQLite,
          with personal further projects utilizing Influxdb.
        </p>

        @for (group of skillGroups; track group.header; let i = $index) {
          <div class="skill-group" @groupAnim>
            <div class="skill-header">{{ group.header }}</div>
            <div class="icons-container">
              @for (icon of group.icons; track icon.key) {
                <div class="icon-wrapper">
                  <div class="icon-box">
                    <div class="skill-icon" [innerHTML]="icon.svg"></div>
                    <div class="skill-title">{{ icon.title }}</div>
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

      .skill-group {
        margin-top: 1rem;
      }

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
      }
    `,
  ],
})
export class SkillsAngularComponent implements OnInit {
  private readonly sanitizer = inject(DomSanitizer);

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

  #icons(entries: [string, string][]): SkillIcon[] {
    return entries.map(([key, title]) => ({
      key,
      title,
      svg: this.sanitizer.bypassSecurityTrustHtml(SKILL_ICONS[key] ?? ''),
    }));
  }
}
