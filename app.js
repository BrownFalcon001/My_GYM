const form = document.getElementById('comments');
// const form1 = document.getElementById('hey');
// adding data to db
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('comments').add({
       name: form.name.value,
       comment: form.comment.value,
       
    });
    form.name.value = '';
    form.comment.value = '';
});
// form1.addEventListener('submit', (e) => {
//     e.preventDefault();
//     db.collection('hello').add({
//         name: form1.name.value,
//         email:form1.email.value,
//         comment: form1.comment.value
//     });
//     form.name.value = '';
//     form.email.value = '';
//     form.comment.value = '';
// });

// reading from db

const div = document.querySelector('.cont');

renderList = (doc) => {
    var main_div = document.createElement('div');
    var card_body = document.createElement('div');
    var name = document.createElement('h5');
    var comment = document.createElement('p');
    main_div.setAttribute('class','card mt-3');
    card_body.setAttribute('class','card-body');
    name.setAttribute('class','card-title');
    comment.setAttribute('class','card-text');
    name.textContent = doc.data().name;
    comment.textContent = doc.data().comment;
    card_body.appendChild(name);
    card_body.appendChild(comment);
    main_div.appendChild(card_body);
    div.appendChild(main_div);
}

// renderList1 = (doc) => {
//     var main_div = document.createElement('div');
//     var card_body = document.createElement('div');
//     var name = document.createElement('h5');
//     var email = document.createElement('p');
//     var comment = document.createElement('p');
//     main_div.setAttribute('class','card mt-3');
//     card_body.setAttribute('class','card-body');
//     name.setAttribute('class','card-title');
//     email.setAttribute('class','card-text');
//     comment.setAttribute('class','card-text');
//     name.textContent = doc.data().name;
//     email.textContent = doc.data().email;
//     comment.textContent = doc.data().comment;
//     card_body.appendChild(name);
//     card_body.appendChild(email);
//     card_body.appendChild(comment);
//     main_div.appendChild(card_body);
//     div.appendChild(main_div);
// }
db.collection('comments').onSnapshot(snap => {
    let changes = snap.docChanges();
    changes.forEach(change => {
        if (change.type == 'added') {
            renderList(change.doc);
        }
    });
});
// db.collection('hello').onSnapshot(snap => {
//     let changes = snap.docChanges();
//     changes.forEach(change => {
//         if (change.type == 'added') {
//             renderList1(change.doc);
//         }
//     });
// });