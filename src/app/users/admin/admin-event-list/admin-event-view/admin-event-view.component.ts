import { Component, Input, OnInit } from '@angular/core';
import { SSEvent } from 'src/app/events/event.model';
import { EventsService } from 'src/app/events/events.service';
import { SSTeam } from 'src/app/events/team.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-event-view',
  templateUrl: './admin-event-view.component.html',
  styleUrls: ['./admin-event-view.component.css']
})
export class AdminEventViewComponent implements OnInit {

  @Input() eventElement : SSEvent

  teams: SSTeam[]
  selectionMade = false;
  teamContent: string = ""
  selectedDay: string = ""

  dayCount = {
    Sunday: 0,
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0
  }

  displayTeams: SSTeam[]

  constructor(private eventsService: EventsService, private router: Router) { }

  ngOnInit(): void {
    this.eventsService.getTeamsByEvent(this.eventElement._id).subscribe(foundTeams => {
      console.log(foundTeams);
      this.teams = foundTeams.teams;
      this.countTeamsByDay()
      console.log(this.teams)
    })
    console.log(this.eventElement);
  }

  countTeamsByDay() {

    for (let team of this.teams) {
      this.dayCount[team.playDay]++;
    }
    console.log(this.dayCount)
  }

  showAllPlayers() {
    this.selectionMade = true
    this.selectedDay = ""
    this.displayTeams = this.teams
    // for (let team of this.teams) {
    //   this.teamContent += `<p class="teamName">Team: ${team.name} </p>`
    //   this.teamContent += `<div class="teamMembers" style="padding: 10px;"> Players:`
    //   for (let player of team.players) {
    //     this.teamContent += `<p class="playerName"> Name: ${player.name}</p>`
    //     this.teamContent += `<p class="playerEmail"> Email: ${player.email}</p>`
    //     this.teamContent += `<p class="playerPhone"> Phone: ${player.phoneNum}</p>`
    //     this.teamContent += "================="
    //
    //   }
    //   this.teamContent += `</div>`
    // }
  }

  showDayPlayers(day) {
    this.selectionMade = true
    this.selectedDay = day;
    this.displayTeams = []
    for (let team of this.teams) {
      if (team.playDay === day) {
        this.displayTeams.push(team)
      }
    }
  }

  downloadAllInfo() {
    console.log("Generating text")
    let fileContent = ""
    for (let team of this.displayTeams) {
      fileContent += "=============================\n\n"
      fileContent += `Team name: ${team.name}\n`
      fileContent += `${team.playDay} @ ${team.playTime}\n`
      for (let player of team.players) {
        fileContent += '=====\n'
        fileContent += `player name: ${player.name}\n`
        fileContent += `Email: ${player.email}\n`
        fileContent += `Phone: ${player.phoneNum}\n`
      }
      fileContent += "\n\n=============================\n"
    }
    console.log(fileContent)
    this.downloadFile(fileContent, "All Team and Player Info");
  }

  downloadEmails() {
    let fileContent = ""
    for (let team of this.displayTeams) {
      for (let player of team.players) {
        fileContent += `${player.email}, `
      }
    }
    this.downloadFile(fileContent, "Email List");

  }

  downloadPhones() {
    let fileContent = ""
    for (let team of this.displayTeams) {
      for (let player of team.players) {
        fileContent += `${player.phoneNum}, `
      }
    }
    this.downloadFile(fileContent, "Phone List");

  }

  downloadFile(fileContent, contentType) {
    const blob = new Blob([fileContent], {type:'application/octet-stream'});
    // const url = window.URL.createObjectURL(blob);
    // window.open(url,'.txt');
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.setAttribute('download', this.eventElement.name + " -- " + contentType + ".txt");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  onEditEvent() {
    this.router.navigate(['admin/event', this.eventElement._id])
  }

}
