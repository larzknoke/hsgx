export const TRAINER_LICENSE_TYPES = {
  helfer: { label: "Helfer", hourlyRate: 5.0 },
  ohne_lizenz: { label: "ÜL ohne Lizenz", hourlyRate: 7.5 },
  kinderhandball: { label: "ÜL mit Kinderhandballtrainer", hourlyRate: 10.0 },
  c_lizenz: { label: "ÜL mit C Lizenz", hourlyRate: 12.5 },
  b_lizenz: { label: "ÜL mit B Lizenz", hourlyRate: 15.0 },
  a_lizenz: { label: "ÜL mit A Lizenz", hourlyRate: 20.0 },
};

export function getTrainerHourlyRate(licenseType) {
  return TRAINER_LICENSE_TYPES[licenseType]?.hourlyRate || 0;
}

export function getTrainerLicenseLabel(licenseType) {
  return TRAINER_LICENSE_TYPES[licenseType]?.label || "-";
}

// Legacy export for backwards compatibility
export const trainerEntgelte = [
  {
    rolle: "Helfer",
    verguetung: 5.0,
  },
  {
    rolle: "ÜL ohne Lizenz",
    verguetung: 7.5,
  },
  {
    rolle: "ÜL mit Kinderhandballtrainer",
    verguetung: 10.0,
  },
  {
    rolle: "ÜL mit C Lizenz",
    verguetung: 12.5,
  },
  {
    rolle: "ÜL mit B Lizenz",
    verguetung: 15.0,
  },
  {
    rolle: "ÜL mit A Lizenz",
    verguetung: 20.0,
  },
];
