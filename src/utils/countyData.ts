// This is a simplified list of US counties. In a real application, you'd want a complete database.
export const counties = [
  "Los Angeles County, California",
  "Cook County, Illinois",
  "Harris County, Texas",
  "Maricopa County, Arizona",
  "San Diego County, California",
  "Orange County, California",
  "Miami-Dade County, Florida",
  "Dallas County, Texas",
  "Kings County, New York",
  "Riverside County, California",
  // Add more counties as needed
];

export const filterCounties = (input: string): string[] => {
  const searchTerm = input.toLowerCase();
  return counties.filter(county => 
    county.toLowerCase().includes(searchTerm)
  ).slice(0, 5); // Limit to 5 suggestions
};

export const isValidCounty = (county: string): boolean => {
  return counties.includes(county);
};