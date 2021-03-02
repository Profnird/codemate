/*

Author:NirdTeq
Developer: Kingsley Amankwa
P: NirdTeq Open Solved Ware

*/
// listening to keyboard 'ENTERKEY'
document.addEventListener('keyup', (event) => {
  if(event.code === 'Enter'){
    // event.preventDefault();
    fetch();
    }
});

// ========================
let validateuser = () => {
  let getpass = document.getElementById('adminpass').value;
  let getadmin = document.getElementById('adminname').value;
  let objectStore = db.transaction("security").objectStore("security");
  objectStore.openCursor().onsuccess = (event) => {
    let cursor = event.target.result;
    if (cursor) {
      console.log(cursor.value.pass);
    // check and validate before permission
      if(getpass === cursor.value.pass && getadmin === cursor.value.name){

        //search permit objstore to find [3] object and update with the successful user (admin)
        var transaction = db3.transaction(["permit"],"readwrite");
           var store = transaction.objectStore("permit");
           var request3 = store.get(3);
           request3.onsuccess = function(){
             var data = request3.result;
                 data.who = whoadmin;
                 console.log(data);
             var requestUpdate = store.put(data);
             // success
             requestUpdate.onsuccess = function(){
               console.log('update-success' + whoadmin);
             }
             // error
             requestUpdate.onerror = function(){
               console.log('update-failed');
             }
           }

        notify();
        setTimeout(function(){
          window.location.replace('main.html');
        },3000);
      }
      // else {
      //   alert('Seek permission!...')
      // }
           cursor.continue();
       }
   };
};
