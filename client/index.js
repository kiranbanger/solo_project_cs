// react app starts here

const body = document.querySelector('body');

fetch('/getdata')
.then( response => response.json())
.then( data => {

  data.forEach( dataObj => {

    const div = document.createElement('div');

    const h1 = document.createElement('h1');
    h1.innerText = dataObj.event_name
    div.append(h1);

    const pStart = document.createElement('p');
    pStart.innerText = dataObj.start_date
    div.append(pStart);

    const pEnd = document.createElement('p');
    pStart.innerText = dataObj.end_date
    div.append(pEnd);

    const pDes = document.createElement('p')
    pDes.innerText = dataObj.event_description;
    div.append(pDes)

    const h3 = document.createElement('h3');
    h3.innerText = 'Your responsibilities for this event: ';
    div.append(h3);

    const pTask = document.createElement('p');
    pTask.innerText = dataObj.task;
    div.append(pTask);

    const pTaskDes = document.createElement('p');
    pTaskDes.innerText = dataObj.task_description;
    div.append(pTaskDes);

    const pTaskDate = document.createElement('p')
    pTaskDate.innerText = dataObj.task_complete_by;
    div.append(pTaskDate)

    body.append(div);
  })
})