import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  ipAddress=""
  ipCity=""
  public ip = fetch("https://ipinfo.io/json?token=86f197def6c631")
              .then((response) => response.json())
              .then((jsonResponse) => {
                this.ipAddress = jsonResponse.ip;
                this.ipCity= jsonResponse.city
              } )
  
}
