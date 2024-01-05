import React, { useEffect, useRef } from 'react';

const PacmanGame = () => {
  const canvasRef = useRef(null);
  const canvasContextRef = useRef(null);

  const oneBlockSize = 40;  // Cambiado a 3 veces el tamaño original
  const wallSpaceWidth = oneBlockSize / 3.2;  // Cambiado a 3 veces el tamaño original
  const wallOffset = (oneBlockSize - wallSpaceWidth) / 2;
  const wallInnerColor = 'black';

  const map = [
    [1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2,2, 2, 2, 2,2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1],
    [1, 2, 1, 1, 1, 2, 1, 1,1, 2, 1, 1,1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 0, 0, 0, 1],
    [1, 2, 1, 1, 1, 2, 1, 1,1, 2, 1, 1,1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 0, 0, 0, 0, 1],
    [1, 2, 2, 2, 2, 2, 2, 2,2, 2, 2, 2,2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 1],
    [1, 2, 1, 1, 1, 2, 1, 2,1, 2, 1, 2,1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2,2, 2, 1, 2,2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 1,1, 2, 1, 1,1, 2, 1, 1,  1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2,1, 2, 1, 2,1, 2, 1, 2,  2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 2,1, 2, 1, 2,1, 2, 1, 2,  1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2,2, 2, 2, 2,2, 2, 2, 2,  1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2],
    [1, 1, 1, 1, 1, 2, 1, 2,1, 2, 1, 2,1, 2, 1, 2,  1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 2, 1, 2,1, 2, 1, 2,1, 2, 1, 2,  1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 2, 1, 2,0, 2, 1, 2,0, 2, 1, 2,  2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 0, 0, 0, 1, 2, 2, 2,1, 2, 2, 2,1, 2, 2, 2,  1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 2, 2, 2,1, 2, 2, 2,1, 2, 2, 2,  2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 1,1, 2, 1, 1,1, 2, 1, 1,  1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 1, 2, 2, 2,1, 2, 2, 2,1, 2, 2, 2,  2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
    [1, 1, 2, 2, 1, 2, 1, 2,1, 2, 1, 2,1, 2, 1, 2,  1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2,2, 2, 1, 2,2, 2, 1, 2,  2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1,1, 1, 1, 1,1, 1, 1, 1,  1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2,2, 2, 2, 2,2, 2, 2, 2,  2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1,1, 1, 1, 1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   ];

  useEffect(() => {
    const initializeGame = () => {
      const canvasElement = canvasRef.current;
      const context = canvasElement.getContext('2d');
      canvasContextRef.current = context;
    };

    initializeGame();
  }, []);

  const createRect = (x, y, width, height, color) => {
    const context = canvasContextRef.current;
    if (context) {
      context.fillStyle = color;
      context.fillRect(x, y, width, height);
    }
  };

  let drawWalls = () => {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] == 1) {
                createRect(
                    j * oneBlockSize,
                    i * oneBlockSize,
                    oneBlockSize,
                    oneBlockSize,
                    "#342DCA"
                );
                if (j > 0 && map[i][j - 1] == 1) {
                    createRect(
                        j * oneBlockSize,
                        i * oneBlockSize + wallOffset,
                        wallSpaceWidth + wallOffset,
                        wallSpaceWidth,
                        wallInnerColor
                    );
                }

                if (j < map[0].length - 1 && map[i][j + 1] == 1) {
                    createRect(
                        j * oneBlockSize + wallOffset,
                        i * oneBlockSize + wallOffset,
                        wallSpaceWidth + wallOffset,
                        wallSpaceWidth,
                        wallInnerColor
                    );
                }

                if (i < map.length - 1 && map[i + 1][j] == 1) {
                    createRect(
                        j * oneBlockSize + wallOffset,
                        i * oneBlockSize + wallOffset,
                        wallSpaceWidth,
                        wallSpaceWidth + wallOffset,
                        wallInnerColor
                    );
                }

                if (i > 0 && map[i - 1][j] == 1) {
                    createRect(
                        j * oneBlockSize + wallOffset,
                        i * oneBlockSize,
                        wallSpaceWidth,
                        wallSpaceWidth + wallOffset,
                        wallInnerColor
                    );
                }
            }
        }
    }
};

  const drawCanvas = () => {
    const context = canvasContextRef.current;
    if (context) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      drawWalls();
      // Otras funciones de dibujo van aquí
    }
  };

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        id="canvas"
        width={map[0].length * oneBlockSize}
        height={map.length * oneBlockSize}
        style={{ border: '1px solid black' }}
      ></canvas>
    </div>
  );
};

export default PacmanGame;
