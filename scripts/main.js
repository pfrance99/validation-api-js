$(document).ready(function() {
  const API_KEY = '$2a$10$fCtrkTXdOeMn/HY9YuiHt.asRMm6OiUZ8gtu7o492W5wsIg5WP4.W';
  const API_URL = 'https://www.potterapi.com/v1/';

  $('#btn-start').on('click', () => {
    let className = $('body').attr('class');
    $('.list').html('Chargement ...');
    getCharacter(className).then((characters) => {
      $('.list').html(generateList(characters));
    });
  });

  //Appelle l'api HarryPotter et retourne un promise
  const getCharacter = house => {
    return new Promise((resolve, reject) => {
      $.get(`${API_URL}characters?key=${API_KEY}&house=${house}`, (data) => {
        return resolve(data);
      })
    });
  }

  //Génere la liste qui affiche les résultats
  const generateList = (characters) => {
    let list = '<li>';
    characters.forEach((char, index) => {
      list += `<ul id="${char._id}" class="char-list">${index + 1}) ${char.name}</ul>`;
    });
    list += '</li>';
    return list;
  }

  /* --- Script Pour le style de la page --- */

  //Modifie la maison selectionnée dans le local storage
  const modifyLocalStorageAndAppend = (house) => {
    localStorage.setItem('house', house);
    $('#actual-house').html(localStorage.getItem('house'))
  };

  $('#selector-green').on('click', () => {
    selectGreen();
  });

  $('#selector-red').on('click', () => {
    selectRed();
  });

  $('#selector-blue').on('click', () => {
    selectBlue();
  });

  $('#selector-yellow').on('click', () => {
    selectYellow();
  });


  const removeAllActive = () => {
    $('#selector-green').removeClass('active');
    $('#selector-red').removeClass('active');
    $('#selector-blue').removeClass('active');
    $('#selector-yellow').removeClass('active');
  }

  const selectGreen = () => {
    removeAllActive();
    $('body').removeClass();
    $('#selector-green').addClass('active');
    $('body').addClass('Slytherin');
    $('.list').html('');
    modifyLocalStorageAndAppend('Slytherin');
  }

  const selectRed = () => {
    removeAllActive();
    $('body').removeClass();
    $('#selector-red').addClass('active');
    $('body').addClass('Gryffindor');
    $('.list').html('');
    modifyLocalStorageAndAppend('Gryffindor');
  }

  const selectBlue = () => {
    removeAllActive();
    $('body').removeClass();
    $('#selector-git remote add origin https://github.com/pfrance99/validation-api-js.gitblue').addClass('active');
    $('body').addClass('Hufflepuff');
    modifyLocalStorageAndAppend('Hufflepuff');
    $('.list').html('');
  }

  const selectYellow = () => {
    removeAllActive();
    $('body').removeClass();
    $('#selector-yellow').addClass('active');
    $('body').addClass('Ravenclaw');
    modifyLocalStorageAndAppend('Ravenclaw');
    $('.list').html('');
  }

  //Test de quelle maison à afficher en fonction du local storage
  if (localStorage.getItem('house') !== null) {
    let className = localStorage.getItem('house');
    modifyLocalStorageAndAppend(className);
    if (localStorage.getItem('house') === 'Gryffindor') {
      selectRed();
    } else if (localStorage.getItem('house') === 'Slytherin') {
      selectGreen();
    } else if (localStorage.getItem('house') === 'Ravenclaw') {
      selectYellow();
    } else if (localStorage.getItem('house') === 'Hufflepuff') {
      selectBlue();
    }
  } else {
    modifyLocalStorageAndAppend('Gryffindor'); //On met la maison par défaut à gryffondor
  }

});