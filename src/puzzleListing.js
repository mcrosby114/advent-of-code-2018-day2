const puzzleMap = {};

for (let i = 1; i <= 25; i++) {
  puzzleMap[`${i}-1`] = {
    label: `Day ${i}, part 1`
  };
  puzzleMap[`${i}-2`] = {
    label: `Day ${i}, part 2`
  };
}

export default puzzleMap;
