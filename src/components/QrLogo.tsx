// Pixel-art QR finder-pattern mark (used as compact icon)
export function QrLogo({ className }: { className?: string }) {
  // 7x7 QR-style finder module
  const on = [
    [1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1],
  ];
  return (
    <svg viewBox="0 0 7 7" className={className} shapeRendering="crispEdges">
      {on.flatMap((row, y) =>
        row.map((v, x) =>
          v ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" /> : null,
        ),
      )}
    </svg>
  );
}

// Full "QR MAKER" pixel wordmark, monochrome
export function QrWordmark({ className }: { className?: string }) {
  // Each letter is a 5-wide x 7-tall pixel matrix. 1 = filled pixel.
  const G: Record<string, number[][]> = {
    Q: [
      [0,1,1,1,0],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,1,0,1],
      [1,0,0,1,0],
      [0,1,1,0,1],
    ],
    R: [
      [1,1,1,1,0],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,1,1,1,0],
      [1,0,1,0,0],
      [1,0,0,1,0],
      [1,0,0,0,1],
    ],
    M: [
      [1,0,0,0,1],
      [1,1,0,1,1],
      [1,0,1,0,1],
      [1,0,1,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
    ],
    A: [
      [0,1,1,1,0],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,1,1,1,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
    ],
    K: [
      [1,0,0,0,1],
      [1,0,0,1,0],
      [1,0,1,0,0],
      [1,1,0,0,0],
      [1,0,1,0,0],
      [1,0,0,1,0],
      [1,0,0,0,1],
    ],
    E: [
      [1,1,1,1,1],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,1,1,1,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,1,1,1,1],
    ],
  };
  const line1 = "QR";
  const line2 = "MAKER";
  const letterW = 5;
  const letterH = 7;
  const gap = 1;

  const row1W = line1.length * letterW + (line1.length - 1) * gap;
  const row2W = line2.length * letterW + (line2.length - 1) * gap;
  const width = Math.max(row1W, row2W);
  const height = letterH * 2 + 2; // line gap of 2

  const renderRow = (text: string, yOffset: number, rowWidth: number) => {
    const xStart = Math.floor((width - rowWidth) / 2);
    return text.split("").flatMap((ch, i) => {
      const grid = G[ch];
      if (!grid) return [];
      const xBase = xStart + i * (letterW + gap);
      return grid.flatMap((row, y) =>
        row.map((v, x) =>
          v ? (
            <rect
              key={`${ch}-${i}-${x}-${y}-${yOffset}`}
              x={xBase + x}
              y={yOffset + y}
              width="1"
              height="1"
              fill="currentColor"
            />
          ) : null,
        ),
      );
    });
  };

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} shapeRendering="crispEdges">
      {renderRow(line1, 0, row1W)}
      {renderRow(line2, letterH + 2, row2W)}
    </svg>
  );
}
