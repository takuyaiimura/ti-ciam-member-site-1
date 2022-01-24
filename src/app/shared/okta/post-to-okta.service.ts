import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PostToOktaService {

  constructor() { }

  async PostUserInfo(url, myToken,body) {
      
    // async function fetchRequest(url) {
      try {
        // Fetch request and parse as JSON
        const response = await fetch(url, {
          method: 'POST',
          mode: 'cors',
          headers: new Headers({
            'Authorization': 'Bearer ' + myToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Sec-Fetch-Site': 'same-origin',
            'Accwess-Control-Allow-Origin':'*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',

          }),
          body: JSON.stringify(body),
        });
        // let data = await response.json();
        // console.log(data)
      } catch (err) {
        return console.error(err);
      }       
  }



}
