/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/comma-dangle */
import * as userTypes from '../../store/user/userTypes';

const LETTERS_REG_EXP = /^[A-Za-z ]*$/;
const EMAIL_REG_EXP = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_-]+)(\.[a-zA-Z]{2,5}){1,2}$/;
const PASSWORD_REG_EXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
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
  const cutName = enteredName.length > 30 ? enteredName.slice(0, 29) : enteredName;
  // eslint-disable-next-line no-param-reassign
  event.target.value = cutName;
}

export function validateEmail(event: React.ChangeEvent<HTMLInputElement>) {
  const enteredEmail = event.target.value;
  if (enteredEmail.length === 0) {
    event.target.style.borderColor = '#84ceeb';
    return false;
  }
  if (!EMAIL_REG_EXP.test(enteredEmail)) {
    event.target.style.borderColor = 'red';
    return false;
  }
  event.target.style.borderColor = 'green';
  return true;
}

export function validatePasswords(
  setNewPassRdy: React.Dispatch<React.SetStateAction<boolean>>
) {
  const passElement = document.getElementById(
    'newPassword'
  ) as HTMLInputElement;
  const passCopy = document.getElementById(
    'newPassConfirm'
  ) as HTMLInputElement;
  const enteredPassCopy = passCopy.value;
  const enteredPassword = passElement.value;
  if (!PASSWORD_REG_EXP.test(enteredPassword) || enteredPassword.length < 8) {
    if (enteredPassword.length === 0) {
      passElement.style.borderColor = '#84ceeb';
    }
    if (enteredPassword.length > 0) {
      passElement.style.borderColor = 'red';
    }
    setNewPassRdy(false);
  }
  if (PASSWORD_REG_EXP.test(enteredPassword) && enteredPassword.length >= 8) {
    passElement.style.borderColor = 'green';
  }

  if (enteredPassword !== enteredPassCopy) {
    if (enteredPassCopy.length === 0) {
      passCopy.style.borderColor = '#84ceeb';
    }
    if (enteredPassCopy.length > 0) {
      passCopy.style.borderColor = 'red';
    }
    setNewPassRdy(false);
  }
  if (
    enteredPassword === enteredPassCopy
    && enteredPassCopy.length > 0
  ) {
    passCopy.style.borderColor = 'green';
  }
  if (
    PASSWORD_REG_EXP.test(enteredPassword)
    && enteredPassword === enteredPassCopy && enteredPassword.length >= 8
  ) {
    setNewPassRdy(true);
  }
}

export function storeNewEmail(updateBody: userTypes.TUpdUserReq) {
  const newEmailField = document.getElementById('newEmail') as HTMLInputElement;
  updateBody.email = newEmailField.value;
}

export function storeNewPassword(updateBody: userTypes.TUpdUserReq) {
  const passElement = document.getElementById(
    'newPassword'
  ) as HTMLInputElement;
  updateBody.password = passElement.value;
}

export function emptyAllFields(fieldName: string) {
  if (fieldName === 'email' || fieldName === 'both') {
    const newEmailField = document.getElementById(
      'newEmail'
    ) as HTMLInputElement;
    newEmailField.value = '';
    newEmailField.style.borderColor = '#84ceeb';
  } else if (fieldName === 'password' || fieldName === 'both') {
    const passElement = document.getElementById(
      'newPassword'
    ) as HTMLInputElement;
    const passCopy = document.getElementById(
      'newPassConfirm'
    ) as HTMLInputElement;
    passElement.style.borderColor = '#84ceeb';
    passCopy.style.borderColor = '#84ceeb';
    passElement.value = '';
    passCopy.value = '';
  }
}
