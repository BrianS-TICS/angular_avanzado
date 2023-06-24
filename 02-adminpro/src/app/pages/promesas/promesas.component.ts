import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {


  constructor() {

  }

  ngOnInit(): void {

    this.getUsuarios()
      .then(users => {
        console.log(users);
      });

    this.getUsuariosByOtherWay();

    // const promesa = new Promise( (resolve, reject) => {

    //   if (false) {
    //     resolve('Hola mundo');
    //   }
    //   else{
    //     reject('Algo salió mal');
    //   }

    // });

    // promesa.then( (response ) =>{ 
    //   console.log(response);
    // })
    // .catch( error => console.log( 'Error en mi promesa' , error ) );

    // console.log('Hola mundo 2');


  }

  getUsuarios() {

    const url = "https://reqres.in/api/users?page=2";

    return new Promise(
      resolve => {
        fetch(url)
          .then(resp => resp.json())
          .then(body => resolve(body.data));
      }
    );
    
  }

  async getUsuariosByOtherWay() {
    const url = "https://reqres.in/api/users?page=2";

    try {
      const result = await fetch(url);
      const data = await result.json();
      console.log(data);

    } catch (error) {
      console.log(error);
    }

  }

}
