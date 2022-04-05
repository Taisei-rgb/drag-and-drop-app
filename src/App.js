import { ITEMS } from "./itemsData";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const grid = 8;

const getListStyle = (isDraggingOver) => ({
	background: isDraggingOver ? "lightblue" : "lightgray",
	width: 250,
	padding: grid,
});

const getItemStyle = (isDragging, draggableStyle) => ({
	userSelect: "none",
	padding: grid * 2,
	margin: `0 0 ${grid} 0`,
	background: isDragging ? "lightgreen" : "grey",

	...draggableStyle,
});

const reorder = (list, startIndex, endIndex) => {
	const removed = list.splice(startIndex, 1);
	list.splice(endIndex, 0, removed[0]);
};

export const App = () => {
	const onDragEnd = (result) => {
		if (!result.destination) {
			return;
		}
		reorder(ITEMS, result.source.index, result.destination.index);
	};
	return (
		<div className="items-center">
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="droppable">
					{(provided, snapshot) => (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
							style={getListStyle(snapshot.isDraggingOver)}
						>
							{ITEMS.map((item, index) => (
								<Draggable key={item.id} draggableId={item.id} index={index}>
									{(provided, snapshot) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											style={getItemStyle(
												snapshot.isDragging,
												provided.draggableProps.style
											)}
										>
											{item.content}
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	);
};
