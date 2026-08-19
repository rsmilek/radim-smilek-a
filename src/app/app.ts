import { Component } from '@angular/core';
import { NavigationComponent } from './layout/navigation/navigation';
import { HomeComponent } from './features/home/home';
import { AboutMeComponent } from './features/about-me/about-me';
import { EducationComponent } from './features/education/education';
import { SkillsGsapComponent } from "./features/skills/skills";
import { PortfolioComponent } from './features/portfolio/portfolio';
import { ContactComponent } from './features/contact/contact';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavigationComponent,
    HomeComponent,
    AboutMeComponent,
    EducationComponent,
    SkillsGsapComponent,
    PortfolioComponent,
    ContactComponent
],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
