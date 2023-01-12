import React, {useState} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import "./styles.css";
import {Card} from "antd";

function App() {
    const mainDivStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };
    const [data, setData] = useState([
        {id: 4, name: "item4"},
        {id: 5, name: "item5"},
        {id: 6, name: "item6"},

    ]);
    const [data2, setData2] = useState([
        {id: 1, name: "item1"},
        {id: 2, name: "item2"},
        {id: 3, name: "item3"},
    ]);
    const onDragEnd = (result) => {
        const {destination, source, draggableId} = result;
        console.log(result);
        if (!destination) {
            return;
        }
        if (source.droppableId !== "droppable-2") {
            if (destination.droppableId === source.droppableId && destination.index === source.index) {
                return;
            }
            if (destination.droppableId === source.droppableId) {
                const items = Array.from(data);
                const [reorderedItem] = items.splice(source.index, 1);
                items.splice(destination.index, 0, reorderedItem);
                setData(items);
            } else {
                const items = Array.from(data);
                const [reorderedItem] = items.splice(source.index, 1);
                const items2 = Array.from(data2);
                items2.splice(destination.index, 0, reorderedItem);
                setData(items);
                setData2(items2);
            }
        }

    }
    return (
        <div style={mainDivStyle}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable-1">
                    {(provided, snapshot) => (
                        <Card ref={provided.innerRef} {...provided.droppableProps}>
                            {data.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                    {(provided, snapshot) => (
                                        <Card ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}>

                                            {item.name}
                                        </Card>
                                    )}
                                </Draggable>
                            ))}
                        </Card>
                    )}
                </Droppable>
                <Droppable droppableId="droppable-2">
                    {(provided, snapshot) => (
                        <Card ref={provided.innerRef} {...provided.droppableProps}>
                            {data2.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                    {(provided, snapshot) => (
                                        <Card ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}>
                                            {item.name}
                                        </Card>
                                    )}
                                </Draggable>
                            ))}
                        </Card>
                    )}
                </Droppable>
            </DragDropContext>
        </div>


    );
}

export default App;
