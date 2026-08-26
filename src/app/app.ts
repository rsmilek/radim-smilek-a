import { Component } from '@angular/core';
import { NavigationComponent } from './layout/navigation/navigation';
import { HomeComponent } from './features/home/home.component';
import { AboutMeComponent } from './features/about-me/about-me.component';
import { EducationComponent } from './features/education/education.component';
import { SkillsComponent } from "./features/skills/skills.component";
import { PortfolioComponent } from './features/portfolio/portfolio.component';
import { ContactComponent } from './features/contact/contact.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavigationComponent,
    HomeComponent,
    AboutMeComponent,
    EducationComponent,
    SkillsComponent,
    PortfolioComponent,
    ContactComponent
],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
