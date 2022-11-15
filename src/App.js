import { useState } from "react";

function App() {
  const [boards, setBoards] = useState([
    { id: 1, title: "Первый", items: [{ id: 1, title: "действие один" }] },
    { id: 2, title: "Второй", items: [{ id: 2, title: "действие два" }] },
    { id: 3, title: "Третий", items: [{ id: 3, title: "действие три" }] },
  ]);

  const [currentBoard, setCurrentBoard] = useState();
  const [currentItem, setCurrentItem] = useState();

  const dragOverHandler = (e) => {
    e.preventDefault();
    if (e.target.className === "item") {
      e.target.style.boxShadow = "0 4px 3px gray";
    }
  };
  const dragLeaveHandler = (e) => {
    e.target.style.boxShadow = "none";
  };
  const dragStartHandler = (e, board, item) => {
    setCurrentBoard(board);
    setCurrentItem(item);
  };
  const dragEndHandler = (e) => {
    e.target.style.boxShadow = "none";
  };
  const dropHandler = (e, board, item) => {
    e.preventDefault();
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    const dropIndex = currentBoard.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem);
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }

        return b
      })
    );
  };

  return (
    <div className="App" style={{ display: "flex" }}>
      {boards.map((board) => (
        <div
          key={board.id}
          style={{ width: "300px", height: "500px", border: "1px solid black" }}
        >
          <div>{board.title}</div>
          {board.items.map((item) => (
            <div
              key={item.id}
              className="item"
              style={{
                padding: "10px",
                margin: "10px",
                border: "1px solid black",
              }}
              draggable={true}
              onDragOver={(e) => dragOverHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragStart={(e) => dragStartHandler(e, board, item)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDrop={(e) => dropHandler(e, board, item)}
            >
              {item.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
