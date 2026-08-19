import {
  Component,
  computed,
  inject,
  signal,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { ThemeService } from '../../core/theme.service';
import { ScrollSpyService, SectionId } from '../../core/scroll-spy.service';
import {
  SUN_ICON,
  MOON_ICON,
  HAMBURGER_ICON,
  CLOSE_ICON,
} from '../../shared/icons/icons';

interface NavItem {
  id: SectionId;
  label: string;
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  template: `
    <mat-sidenav-container class="nav-sidenav-container">
      <!-- Drawer for mobile -->
      <mat-sidenav #drawer class="nav-drawer" mode="over" position="start">
        <div class="drawer-header">
          <button
            mat-icon-button
            class="close-btn"
            (click)="drawer.close()"
            aria-label="Close menu"
          >
            <span [innerHTML]="closeIcon"></span>
          </button>
        </div>
        <mat-nav-list>
          @for (item of navItems; track item.id) {
            <mat-list-item
              [class.active]="activeSection() === item.id"
              (click)="scrollTo(item.id); drawer.close()"
            >
              {{ item.label }}
            </mat-list-item>
          }
          <mat-list-item (click)="themeService.toggle(); drawer.close()">
            <span [innerHTML]="themeIcon()"></span>
          </mat-list-item>
        </mat-nav-list>
      </mat-sidenav>

      <!-- Main content slot -->
      <mat-sidenav-content>
        <!-- Top toolbar -->
        <mat-toolbar class="nav-toolbar" color="primary">
          <!-- Hamburger (small screens) -->
          <button
            mat-icon-button
            class="hamburger-btn"
            (click)="drawer.open()"
            aria-label="Open menu"
          >
            <span [innerHTML]="hamburgerIcon"></span>
          </button>

          <span class="nav-brand">RS</span>

          <!-- Nav items (large screens) -->
          <nav class="nav-links">
            @for (item of navItems; track item.id) {
              <button
                mat-button
                [class.active]="activeSection() === item.id"
                (click)="scrollTo(item.id)"
              >
                {{ item.label }}
              </button>
            }
          </nav>

          <span class="nav-spacer"></span>

          <!-- Theme toggle -->
          <button
            mat-icon-button
            (click)="themeService.toggle()"
            aria-label="Toggle theme"
          >
            <span [innerHTML]="themeIcon()"></span>
          </button>
        </mat-toolbar>

        <!-- Page content projected here -->
        <ng-content></ng-content>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      .nav-sidenav-container {
        min-height: 100dvh;
      }

      .nav-toolbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
      }

      .nav-brand {
        font-weight: 700;
        font-size: 1.25rem;
        margin-right: 1rem;
      }

      .nav-links {
        display: flex;
        gap: 0.25rem;
      }

      .nav-links button.active,
      mat-list-item.active {
        font-weight: 700;
        text-decoration: underline;
      }

      .nav-spacer {
        flex: 1 1 auto;
      }

      .hamburger-btn {
        display: none;
      }

      @media (max-width: 768px) {
        .hamburger-btn {
          display: inline-flex;
        }
        .nav-links {
          display: none;
        }
      }

      .drawer-header {
        display: flex;
        justify-content: flex-end;
        padding: 0.5rem;
      }

      mat-sidenav-content {
        padding-top: 64px;
      }

      :host ::ng-deep svg {
        width: 24px;
        height: 24px;
        fill: currentColor;
        stroke: currentColor;
      }
    `,
  ],
})
export class NavigationComponent implements OnInit, OnDestroy {
  protected readonly themeService = inject(ThemeService);
  private readonly scrollSpy = inject(ScrollSpyService);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly activeSection = this.scrollSpy.activeSection;

  protected readonly navItems: NavItem[] = [
    { id: 'home', label: 'Home' },
    { id: 'about-me', label: 'About Me' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' },
  ];

  protected readonly hamburgerIcon: SafeHtml =
    this.sanitizer.bypassSecurityTrustHtml(HAMBURGER_ICON);
  protected readonly closeIcon: SafeHtml =
    this.sanitizer.bypassSecurityTrustHtml(CLOSE_ICON);

  protected readonly themeIcon = computed<SafeHtml>(() => {
    const svg =
      this.themeService.theme() === 'dark' ? MOON_ICON : SUN_ICON;
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  });

  #resizeObserver: ResizeObserver | null = null;

  ngOnInit(): void {
    // Start observing sections once they are in the DOM
    this.#observeSections();
  }

  ngOnDestroy(): void {
    this.#resizeObserver?.disconnect();
  }

  protected scrollTo(id: SectionId): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  #observeSections(): void {
      const ids: SectionId[] = ['home', 'about-me', 'education', 'skills', 'portfolio', 'contact'];
    // Wait for DOM ready
    setTimeout(() => {
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) this.scrollSpy.observe(el);
      });
    }, 0);
  }
}
