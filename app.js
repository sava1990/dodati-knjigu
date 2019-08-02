

//construktor za knjige

function Knjige(naslov,autor){
    this.naslov = naslov;
    this.autor = autor;
}

//construktor za UI

function UI(){}

UI.prototype.dodatiKnjiguLIsti = function(knjiga){
    console.log(knjiga)

    const lista = document.querySelector('#lista-knjiga');

    //kreirati tr element
    const red  = document.createElement('tr');

    red.innerHTML = 
    `
    <td>${knjiga.naslov}</td>
    <td>${knjiga.autor}</td>
    <td><a href="#" class="isbrisati">X<a></td>
    `;

    lista.appendChild(red)


}

UI.prototype.ocistitiPolja = function(){
    document.querySelector('#naslov').value = '';
    document.querySelector('#autor').value = '';
    
}

//Prikazi Poruku
UI.prototype.prikaziPoruku = function(poruka,className){

    const div = document.createElement('div')
    div.className = `alert ${className}`;
    const p = document.createElement('p');
    p.innerHTML = poruka;

    div.appendChild(p)

    //uzeti parenta

    const container = document.querySelector('.container');

    const form = document.querySelector('#forma-knige');

    container.insertBefore(div,form);

    //nestati posle 3 sekunde
    setTimeout(function(){
        document.querySelector('.alert').remove();
    },3000)
}


//brisanje knjiga

UI.prototype.obrisatiKnjigu = function(target){

    if(target.className === 'isbrisati'){
        target.parentElement.parentElement.remove()
    }

}
//event listener za dodavanje knjiga
document.getElementById('forma-knige').addEventListener('submit', function(e){

  console.log('radi');

  //uzeti vredonst od form inputa
  const naslov = document.querySelector('#naslov').value;
  console.log(naslov);
  const autor = document.querySelector('#autor').value; 
  console.log(autor)


 //instaciramo knjigu
  const knjiga = new Knjige(naslov,autor);
  console.log(knjiga)


  //instacirati UI
  const ui = new UI();
  console.log(ui)

  //validizacija

  if(knjiga.naslov === '' || knjiga.autor === ''){
      console.log('radi validaizacija')
      ui.prikaziPoruku('Molim Vas popunite polja' , 'error')

  }else{

   //dodati knjigu
   ui.dodatiKnjiguLIsti(knjiga)

   //prikazati uspesnost
   ui.prikaziPoruku('Popunili ste polja','uspesno')

   //ocistiti polja
   ui.ocistitiPolja()

  }


  e.preventDefault()
    
})



//event listener za brisanje

document.querySelector('#lista-knjiga').addEventListener('click' ,function(e){

    console.log('radi za brisanje')

    const ui = new UI();

    ui.obrisatiKnjigu(e.target)

    //prikazi poruku
    ui.prikaziPoruku('izbrisana knjiga!', 'uspesno')

    e.preventDefault();
})

