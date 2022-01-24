export interface mfaList {
  id: string;
  value: string;
  viewValue: string;
  imagePath: string;
}

export const mfaItems = [
  {
    id: '0',
    value: 'okta_verify_push',
    viewValue: 'Okta Verify Push',
    imagePath: 'assets/img/oktaverify.png'
  },
  {
    id: '1',
    value: 'okta_sms',
    viewValue: 'SMS Factor',
    imagePath: 'assets/img/under_const.png'
  }
];
