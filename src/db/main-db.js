//db: indexedDB
/*

author: Kingsley Amankwa
Lead Developer | Co-Founder
Org: NirdTeq

*/
const indexedDB = window.indexedDB || webkitIndedexedDB || mozIndedexedDB || msIndexedDB;
const IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction ||
    window.msIDBTransaction;

const IDBKeyRange = window.IDBKeyRange ||
    window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!indexedDB) {
    alert("Unsupported Browser");
}
// const file = ßStorageManager.persist()

let db;
let request = indexedDB.open("code-db_1", 2);
request.onupgradeneeded = (event) => {
    console.log('creating Objectstores');
    db = event.target.result;
    let useracc = db.createObjectStore('useracc', {
      keyPath: "id",autoIncrement: true
    });
    let usersettings = db.createObjectStore('usersettings', {
      keyPath: "id",autoIncrement: true
    });
    let userlesson = db.createObjectStore('userlesson', {
      keyPath: "id",autoIncrement: true
    });
    let userprofile = db.createObjectStore('userprofile', {
      keyPath: "id",autoIncrement: true
    });
};
    console.log(request);
    request.onerror = (event) => {
        console.log("Error: " + event);
    };

// persisting data stored in indexedDB
    request.onsuccess = (event) => {
        db = event.target.result;
        console.log("Success: " + db);
        navigator.storage.persist().then(console.log.bind(console));
        navigator.storage.persist().then((granted) => {
          if (granted) {
            console.log('Data persisted');
          }
        })
        navigator.storage.persist();
        if (navigator.storage && navigator.storage.persist){
          const isPersisted =  navigator.storage.persisted();
          console.log('Persisted storage granted: ',isPersisted);
        }
    };

    // add data to objstore useracc
    let addnewuser = () => {
      var username, password,confirmpass,userpass, age, date;
      username = document.getElementById('newusername').value;
      password = document.getElementById('newuserpass').value;
      confirmpass = document.getElementById('newuserpass').value;
        age = document.getElementById('ageselect').value;
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        // validation
        if (username != '' && password != '' && confirmpass != '' && age != 'selectage') {
          if (password != confirmpass) {
            alert('password do not match!');
          }else {
            userpass = password;
            // new user data to be stored
            let data = {
              name: username,
              pass: userpass,
              agetype: age,
              period : today
              };
              // storing data and checking for success and error
              let request = db.transaction(['useracc'], 'readwrite').objectStore('useracc').add(data);
              request.onsuccess = (event) => {
                console.log('stored new user');
                alert('Mo! Mate. Akwaaba, from the world of Mates');
              };
              request.onerror = (event) => {
                console.log('Couldn\'t Store!');
                console.log('error: ', event.target.error.name);
              };
          }
        }else {
          alert('Complete form!')
        }
    };
    // listening to keyboard for enter key to initiate addnewuser
    document.addEventListener('keyup', (event) => {
      if(event.code === 'Enter'){
        // event.preventDefault();
        addnewuser();
        }
    });
    $('#signbtn').click(function(){
        addnewuser();
        console.log('signup btn clicked');
    });
