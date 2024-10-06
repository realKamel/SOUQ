import { Component } from "@angular/core";
import { NavbarBlankComponent } from "../../components/navbar-blank/navbar-blank.component";
import { RouterOutlet } from "@angular/router";

@Component({
	selector: "app-blank",
	standalone: true,
	imports: [NavbarBlankComponent, RouterOutlet],
	templateUrl: "./blank.component.html",
	styleUrl: "./blank.component.scss",
})
export class BlankComponent {}
