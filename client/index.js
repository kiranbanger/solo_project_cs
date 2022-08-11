// react app starts here

const container = document.querySelector('.container');

fetch('/getdata')
.then( response => response.json())
.then( data => {


  const div = document.createElement('div');

  const h1 = document.createElement('h1');
  h1.innerText = data[0].event_name
  div.append(h1);

  const pStart = document.createElement('p');
  pStart.innerText = 'Start Date: '+ data[0].start_date
  div.append(pStart);

  const pEnd = document.createElement('p');
  pEnd.innerText = 'End Date: ' + data[0].end_date
  div.append(pEnd);

  const pDes = document.createElement('p')
  pDes.innerText = data[0].event_description;
  div.append(pDes)

  const h3 = document.createElement('h3');
  h3.innerText = 'Your responsibilities for this event: ';
  div.append(h3);

  container.append(div)

  const taskDiv = document.createElement('div'); // div for tasks
  const list = document.createElement('ul') // unordered list for tasks

  data.forEach( dataObj => {
    const listItem = document.createElement('li');
    listItem.innerText = dataObj.task;


    const innerList = document.createElement('ul');

    const innerListItem = document.createElement('li');
    innerListItem.innerText = 'More Details: ' + dataObj.task_description;
    innerList.append(innerListItem)

    const innerListItem2 = document.createElement('li');
    innerListItem2.innerText = 'Complete by: '+ dataObj.task_complete_by;
    innerList.append(innerListItem2)
    // const pTask = document.createElement('p');
    // pTask.innerText = dataObj.task;
    // div.append(pTask);

    // const pTaskDes = document.createElement('p');
    // pTaskDes.innerText = 'More Details: ' + dataObj.task_description;
    // div.append(pTaskDes);

    // const pTaskDate = document.createElement('p')
    // pTaskDate.innerText = 'Complete by: '+ dataObj.task_complete_by;
    // div.append(pTaskDate)
    listItem.append(innerList)
    list.append(listItem)
    
  })
  taskDiv.append(list);
  container.append(taskDiv);
})