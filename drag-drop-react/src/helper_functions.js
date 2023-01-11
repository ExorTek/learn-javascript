export default {
  reorder: function(source, destination, taskDataArr) {
    console.log("reorder => ", source, destination, taskDataArr);
    let taskData = [...taskDataArr];

    //     //_____________________________________________________________Source data
    let sourceGroupIndex = taskData.findIndex((val, index) => {
      // iterate and find "Today" (or other) index in list data
      return val.groupName === source.droppableId;
    });

    let draggedTask = taskData[sourceGroupIndex].tasks.find((val, index) => {
      // Get specific task object based on index
      return source.index === index;
    }); // dragged object

    let sourceListCopyWithElementRemoved = taskData[
      sourceGroupIndex
    ].tasks.filter((val, index) => {
      return index !== source.index; // removes dragged element from array
    });

    // //__________________________________________________________________Destination data

    let destinationGroupIndex = taskData.findIndex((val, index) => {
      // iterate and find "Tomorrow" (or other) index in list data
      return val.groupName === destination.droppableId;
    });

    taskData[destinationGroupIndex].tasks.splice(
      destination.index,
      0,
      draggedTask
    ); // insert dragged item to new place
    taskData[sourceGroupIndex].tasks = sourceListCopyWithElementRemoved;

    return taskData;
  }
};
