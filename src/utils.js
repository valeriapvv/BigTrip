const getRandomNumber = (minNumber, maxNumber, digits = 0) => {
  // if (minNumber < 0 || maxNumber < 0) {
  //   throw new RangeError('Диапазон может быть только положительным');
  // }

  let randomNumber = maxNumber - Math.random() * (maxNumber - minNumber);
  randomNumber *= 10**digits;
  randomNumber = Math.round(randomNumber);
  randomNumber /= 10**digits;

  if (randomNumber < Math.min(minNumber, maxNumber) || randomNumber > Math.max(minNumber, maxNumber)) {
    throw new RangeError('Невозможно получить число с таким округлением в заданном диапазоне');
  }

  return randomNumber;
};

const getRandomInteger = (minNumber, maxNumber) => getRandomNumber(minNumber, maxNumber);

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const generateRandomArray = (lengthRange, generateElement) => Array.from(
  {length: getRandomInteger(lengthRange[0], lengthRange[1])},
  generateElement,
);

const createRandomUniqueIntegerGenerator = (min, max) => {
  const generatedValues = [];

  return () => {
    let currentValue = getRandomInteger(min, max);

    if (generatedValues.length >= (max - min + 1)) {
      throw new Error('Перебраны все числа диапазона');
    }

    while (generatedValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }

    generatedValues.push(currentValue);
    return currentValue;
  };
};

export {
  getRandomArrayElement,
  getRandomInteger,
  generateRandomArray,
  createRandomUniqueIntegerGenerator,
};

