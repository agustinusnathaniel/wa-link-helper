import getUnicodeFlagIcon from 'country-flag-icons/unicode';

import phoneCountryCodes from '@/lib/constants/phone-country-code.json';

export const countryCodeOptions = Object.keys(phoneCountryCodes).map(
  (countryCode) => {
    const countryFlag = getUnicodeFlagIcon(countryCode);
    const regionName = new Intl.DisplayNames(['en'], { type: 'region' }).of(
      countryCode
    );
    const phoneCountryCode =
      phoneCountryCodes[countryCode as keyof typeof phoneCountryCodes];

    return {
      label: `${countryFlag} ${regionName} - ${phoneCountryCode}`,
      value: countryCode,
    };
  }
);

export const getPhoneCountryCode = (countryCode: string) =>
  phoneCountryCodes[countryCode as keyof typeof phoneCountryCodes];
