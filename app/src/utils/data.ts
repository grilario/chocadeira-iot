export function generateList(length, minValue, maxValue) {
  const dataList = [];
  let currentDate = Date.now();

  for (let i = 0; i < length; i++) {
    dataList.push({
      time: currentDate,
      value: getRandomNumber(minValue, maxValue),
    });

    currentDate = currentDate + 5 * 60 * 1000;
  }

  return dataList;
}

export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function simplifyList(list, newSize) {
  if (list.length < newSize) return list;
 
  const chunkSize = Math.floor(list.length / newSize);

  const newList = Array.from({ length: newSize }, (_, i) => {
    const chunk = list.slice(i * chunkSize, (i + 1) * chunkSize);

    const middle = Math.floor(chunk.length / 2);
    // if (chunk.length % 2 === 0) {
    //     return {
    //       date: (chunk[middle - 1].date + chunk[middle].date) / 2,
    //       value: (chunk[middle - 1].value + chunk[middle].value) / 2,
    //     }
    // } else {
    //     return chunk[middle];
    // }

    return chunk[middle];

    // return chunk.reduce((accumulator, value, i) => {
    //   const temp = {
    //     date: accumulator.date + value.date,
    //     value: accumulator.value + value.value,
    //   };

    //   if (i + 1 === chunk.length) {
    //     return {
    //       date: temp.date / chunk.length,
    //       value: temp.value / chunk.length,
    //     };
    //   }

    //   return temp;
    // });
  });

  return newList;
}
