import { Component } from '@angular/core';
import { NavigationComponent } from './layout/navigation/navigation';
import { HomeComponent } from './features/home/home';
import { AboutMeComponent } from './features/about-me/about-me';
import { SkillsAngularComponent } from './features/skills/skills-angular';
import { PortfolioComponent } from './features/portfolio/portfolio';
import { ContactComponent } from './features/contact/contact';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavigationComponent,
    HomeComponent,
    AboutMeComponent,
    SkillsAngularComponent,
    PortfolioComponent,
    ContactComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
