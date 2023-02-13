/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/comma-dangle */
import * as userTypes from '../../store/user/userTypes';
// const INTEGERS_REG_EXP = /^\d+$/;
const LETTERS_REG_EXP = /^[A-Za-z ]*$/;
function filterString(
  event: React.ChangeEvent<HTMLInputElement>,
  regExp: RegExp
): string {
  return event.target.value
    .split('')
    .filter((char) => regExp.test(char))
    .join('');
}

export function countAge(event: React.ChangeEvent<HTMLInputElement>) {
  const ageInput = document.getElementById('agefield') as HTMLElement;
  const now = Date.now();
  const enteredDate = event.target.value;
  const birthDate = new Date(enteredDate);
  const mathValue = birthDate.getTime();
  const age = Math.floor((now - mathValue) / 31536000000);
  console.log(now - mathValue, age);
  ageInput.textContent = `${age}`;
}

export function saveDataToObject(
  updateObject: userTypes.TUpdUserReq,
  nameUpdate: boolean,
  ageUpdate: boolean,
  locationUpdate: boolean,
  bioUpdate: boolean
) {
  const updatedAge = document.getElementById('agefield') as HTMLElement;
  const updatedName = document.getElementById('namefield') as HTMLInputElement;
  const updatedLocation = document.getElementById(
    'locationfield'
  ) as HTMLInputElement;
  const updatedBio = document.getElementById('biofield') as HTMLInputElement;
  if (nameUpdate) updateObject.name = updatedName.value;
  if (ageUpdate) updateObject.age = updatedAge.textContent ? +updatedAge.textContent : 0;
  if (bioUpdate) updateObject.bio = updatedBio.value;
  if (locationUpdate) updateObject.from = updatedLocation.value;
}

export function validateName(event: React.ChangeEvent<HTMLInputElement>) {
  const enteredName: string = filterString(event, LETTERS_REG_EXP);
  // eslint-disable-next-line no-param-reassign
  event.target.value = enteredName;
}
